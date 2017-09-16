/* main.js */

//------------------------------------------------------------------------------
// CONFIGURATION
//------------------------------------------------------------------------------

// Paths
const folder_data = "data";
const path_menu = folder_data + "/menu/items.json";
const folder_pages = folder_data + "/pages";

// Messages
const menu_load_error = "[Menu Error]";
const page_load_error = "[Page Error]";

// Names of Fields & Their Values in JSON Format
const menu_type_vn = "type";
const menu_type_val = "menu";
const menu_items_count_vn = "items_count";
const menu_titles_vn = "titles";
const menu_links_vn = "links";
//
const page_type_vn = "type";
const page_type_val = "page";
const page_title_vn = "title";
const page_subtitle_vn = "subtitle";
const page_content_b64_vn = "content_b64";
const page_content_md5_vn = "content_md5";
const page_content_vn = "content";

// CSS Style Names
const menu_item_active_sn = "menu_item_active";
const menu_item_common_sn = "menu_item_common";

// Function Names
const page_show_fn = "showPage";

// HTML Tag IDs
const div_layer_1_tid = "layer_1";
const div_title_tid = "title";
const div_subtitle_tid = "subtitle";
const div_menu_tid = "menu";
const div_mca_tid = "mca";

//------------------------------------------------------------------------------
// VARIABLES
//------------------------------------------------------------------------------

var div_layer_1;
var div_title;
var div_subtitle;
var div_menu;
var div_mca;
var menu;
var menu_isLoaded;
var menu_size;
var page;
var page_isLoaded;
var page_current;
var page_asked;

//------------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------------

function init()
{
	// Initializes the Page after its Load.

	// Get Objects
	div_layer_1 = document.getElementById(div_layer_1_tid);
	div_title = document.getElementById(div_title_tid);
	div_subtitle = document.getElementById(div_subtitle_tid);
	div_menu = document.getElementById(div_menu_tid);
	div_mca = document.getElementById(div_mca_tid);

	// Fill Objects
	div_title.innerHTML = "";
	div_subtitle.innerHTML = "";
	div_menu.innerHTML = "";
	div_mca.innerHTML = "";
	
	// Page
	page_current = -1;

	get_menu();
};

//------------------------------------------------------------------------------

function get_menu()
{
	// Loads the Menu from JSON File.
	// And then Checks It & Shows It.

	var request, requestMethod, requestURL, requestIsAsync, response;

	requestMethod = "GET";
	requestURL = path_menu;
	requestIsAsync = true;

	if (window.XMLHttpRequest)
	{
		// Modern Browser
		request = new XMLHttpRequest();
	}
	else
	{
		// Old Browser
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}

	// State Handler
	request.onreadystatechange = function()
	{
		if (this.readyState == 4)
		{
			if (this.status == 200)
			{
				response = this.responseText;
				menu = JSON.parse(response);
				
				// Check Menu
				var res = checkMenu(menu);
				
				if (res != false)
				{
					menu_size = res;
					menu_isLoaded = true;
				}
				else
				{
					menu_size = 0;
					menu_isLoaded = false;
				}
			}
			
			if ((this.status == 0) || (this.status == 404))
			{
				// No Connection or Not Found
				menu_isLoaded = false;
			}
			
			showMenu();
			showDefaultPage();
		}
	};
	
	// Timeout Handler
	request.ontimeout = function()
	{
		menu_isLoaded = false;
		showMenu();
	}
	
	
	request.open(requestMethod, requestURL, requestIsAsync);
	request.send();
}

//------------------------------------------------------------------------------

function checkMenu(obj)
{
	// Checks if Menu is good.
	// If Errors occur, then returns false.
	// Otherwise, returns the Number of Menu Items.

	var items_count = 0;
	var titles_count = 0;
	var links_count = 0;
	
	// Name
	if (!varExists(obj[menu_type_vn]))
	{
		return false;
	}
	if (obj[menu_type_vn] != menu_type_val)
	{
		return false;
	}
	
	// Items Count
	if (!varExists(obj[menu_items_count_vn]))
	{
		return false;
	}
	items_count = obj[menu_items_count_vn];
	if (items_count < 1)
	{
		return false;
	}
	
	// Titles
	if (!varExists(obj[menu_titles_vn]))
	{
		return false;
	}
	titles_count = obj[menu_titles_vn].length;
	if (titles_count != items_count)
	{
		return false;
	}
	
	// Links
	if (!varExists(obj[menu_links_vn]))
	{
		return false;
	}
	links_count = obj[menu_links_vn].length;
	if (links_count != items_count)
	{
		return false;
	}
	
	return items_count;
}

//------------------------------------------------------------------------------

function varExists(variable)
{
	// Checks if the Variable Exists or Not.

	var exists = false;
	
	try
	{
		if (variable)
		{
			exists = true;
		}
	}
	catch(e)
	{
		;
	}
	
	return exists;
}

//------------------------------------------------------------------------------

function showMenu()
{
	// Displays Loaded Menu on the Page.

	if (menu_isLoaded)
	{
		var new_html = "";
		
		for (i = 0; i < menu_size; i++)
		{
			if (i == page_current)
			{
				new_html += "<div class=\"" + menu_item_active_sn + "\" " + 
							"onclick='" + page_show_fn + "(" +
							(i+1) + ");'>" + menu[menu_titles_vn][i] +
							"</div>";
			}
			else
			{
				new_html += "<div class=\"" + menu_item_common_sn + "\" " +
							"onclick='" + page_show_fn + "(" +
							(i+1) + ");'>" + menu[menu_titles_vn][i] +
							"</div>";
			}
			
		}
		
		div_menu.innerHTML = new_html;
	}
	else
	{
		div_menu.innerHTML = menu_load_error;
	}
}

//------------------------------------------------------------------------------

function showDefaultPage()
{
	// Starts Loading the Default Page and then Shows It.

	showPage(1);
}

//------------------------------------------------------------------------------

function showPage(n)
{
	// Shows the Page.
	// 'n' starts from 1.
	
	page_asked = n-1;
	getPage(n-1);
}

//------------------------------------------------------------------------------

function getPage(page_num)
{
	// Loads the Page from JSON File.
	// And then Checks It & Shows It.
	// 'page_num' starts from 0.
	
	var request, requestMethod, requestURL, requestIsAsync, response;
	
	requestMethod = "GET";
	requestURL = folder_pages + "/" + menu[menu_links_vn][page_num];
	requestIsAsync = true;
	
	if (window.XMLHttpRequest)
	{
		// Modern Browser
		request = new XMLHttpRequest();
	}
	else
	{
		// Old Browser
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// State Handler
	request.onreadystatechange = function()
	{
		if (this.readyState == 4)
		{
			if (this.status == 200)
			{
				response = this.responseText;
				page = JSON.parse(response);
				
				// Check Page
				var checkIsOk = checkPage(page);
				
				if (checkIsOk != false)
				{
					page_isLoaded = true;
				}
				else
				{
					page_isLoaded = false;
				}
			}

			if ((this.status == 0) || (this.status == 404))
			{
				// No Connection or Not Found
				page_isLoaded = false;
			}
			
			displayPage();
		}
	};
	
	// Timeout Handler
	request.ontimeout = function()
	{
		page_isLoaded = false;
		displayPage();
	}
	
	request.open(requestMethod, requestURL, requestIsAsync);
	request.send();
}

//------------------------------------------------------------------------------

function checkPage(obj)
{
	// Checks if Page is good.
	// If Errors occur, then returns false.
	// Otherwise, returns true.
	
	// Name
	if (!varExists(obj[page_type_vn]))
	{
		return false;
	}
	if (obj[page_type_vn] != page_type_val)
	{
		return false;
	}
	
	// Title
	if (!varExists(obj[page_title_vn]))
	{
		return false;
	}
	if (obj[page_title_vn].length < 1)
	{
		return false;
	}
	
	// Sub-Title
	if (!varExists(obj[page_subtitle_vn]))
	{
		return false;
	}
	if (obj[page_subtitle_vn].length < 1)
	{
		return false;
	}
	
	// Content_b64
	if (!varExists(obj[page_content_b64_vn]))
	{
		return false;
	}
	if (obj[page_content_b64_vn].length < 1)
	{
		return false;
	}
	
	// Content_md5
	if (!varExists(obj[page_content_md5_vn]))
	{
		return false;
	}
	if (obj[page_content_md5_vn].length < 1)
	{
		return false;
	}
	
	// MD5 Check Sum
	var content_b64 = obj[page_content_b64_vn];
	var content_md5 = obj[page_content_md5_vn];
	var content = b64DecodeUnicode(content_b64);
	var content_decoded_md5 = SparkMD5.hash(content);
	
	if (content_decoded_md5 != content_md5)
	{
		return false;
	}
	else
	{
		// Save Decoded HTML to Object
		obj[page_content_vn] = content;
	}
	
	return true;
}

//------------------------------------------------------------------------------

function displayPage()
{
	// Displays the Page's Content on the Web Page.
	
	var page_content;
	
	if (page_isLoaded)
	{
		div_title.innerHTML = page[page_title_vn];
		div_subtitle.innerHTML = page[page_subtitle_vn];
		div_mca.innerHTML = page[page_content_vn];
		
		page_current = page_asked;
	}
	else
	{
		div_title.innerHTML = '';
		div_subtitle.innerHTML = '';
		div_mca.innerHTML = page_load_error;
		
		page_current = -1;
	}
	
	showMenu();
}

//------------------------------------------------------------------------------

function b64DecodeUnicode(str)
{
	func = function (c)
	{
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }

    x = Array.prototype.map.call(atob(str), func).join('');

	decoded = decodeURIComponent(x);

    return decoded;
}

//------------------------------------------------------------------------------
