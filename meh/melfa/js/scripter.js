function put (a)
{
	var input = document.getElementById('input');
	
	if (a == ' ')
	{
		input.value = input.value + ' ';
	}
	else if (a == '.')
	{
		input.value = input.value + '-';
	}
	else if (a == ',')
	{
		input.value = input.value + '=';
	}
	else if (a == 'm')
	{
		input.value = input.value + 'y';
	}
	else if (a == 'n')
	{
		input.value = input.value + '6';
	}
	else if (a == 'mm')
	{
		input.value = input.value + 't';
	}
	else if (a == 'nn')
	{
		input.value = input.value + '5';
	}
	else if (a == 'a')
	{
		input.value = input.value + ']';
	}
	else if (a == 'ia')
	{
		input.value = input.value + ']Ĭ';
	}
	else if (a == 'o')
	{
		input.value = input.value + 'h';
	}
	else if (a == 'io')
	{
		input.value = input.value + 'hĬ';
	}
	else if (a == 'u')
	{
		input.value = input.value + '.';
	}
	else if (a == 'iu')
	{
		input.value = input.value + '.Ĭ';
	}
	else if (a == 'e')
	{
		input.value = input.value + 'l';
	}
	else if (a == 'ie')
	{
		input.value = input.value + 'lĬ';
	}
	else if (a == 'i')
	{
		input.value = input.value + '~';
	}
	else if (a == 'soft')
	{
		input.value = input.value + ' ';
	}
	else if (a == 'j')
	{
		input.value = input.value + '~Û';
	}
	else if (a == 'w')
	{
		input.value = input.value + '.Ú';
	}
	
	else if (a == 'v')
	{
		input.value = input.value + 'r';
	}
	else if (a == 'f')
	{
		input.value = input.value + 'e';
	}
	else if (a == 'z')
	{
		input.value = input.value + 'k';
	}
	else if (a == 's')
	{
		input.value = input.value + '8';
	}
	else if (a == 'h')
	{
		input.value = input.value + '9';
	}
	else if (a == 'r')
	{
		input.value = input.value + '7';
	}
	else if (a == 'ш')
	{
		input.value = input.value + '';
	}
	else if (a == 'ж')
	{
		input.value = input.value + '';
	}
	else if (a == 'l')
	{
		input.value = input.value + 'j';
	}
	else if (a == 'b')
	{
		input.value = input.value + 'w';
	}
	else if (a == 'p')
	{
		input.value = input.value + 'q';
	}
	else if (a == 'd')
	{
		input.value = input.value + '2';
	}
	else if (a == 't')
	{
		input.value = input.value + '1';
	}
	else if (a == 'g')
	{
		input.value = input.value + 's';
	}
	else if (a == 'k')
	{
		input.value = input.value + 'a';
	}
	else if (a == 'p1')
	{
		input.value = input.value + '=';
	}
	else if (a == 'p2')
	{
		input.value = input.value + '-';
	}
	else if (a == '\r')
	{
		input.value = input.value + '\r';
	}
	else if (a == '\n')
	{
		input.value = input.value + '\n';
	}
	else if (a == 'back')
	{
		input.value = input.value.slice(0, input.value.length - 1);
	}
}

//------------------------------------------------------------------------------

function get_key(event)
{
	var key = event.which;
	var input = document.getElementById('input');
	var output = document.getElementById('output');
	var input_focused = input.matches(":focus");
	var output_focused = output.matches(":focus");
	if ( (!input_focused) && (!output_focused))
	{
		if (key == 32) { put(' '); }
		else if (key == 77) { put('m'); }
		else if (key == 78) { put('n'); }
		else if (key == 49) { put('mm'); }
		else if (key == 50) { put('nn'); }
		else if (key == 65) { put('a'); }
		else if (key == 79) { put('o'); }
		else if (key == 85) { put('u'); }
		else if (key == 69) { put('e'); }
		else if (key == 73) { put('i'); }
		else if (key == 51) { put('ia'); }
		else if (key == 52) { put('io'); }
		else if (key == 53) { put('iu'); }
		else if (key == 54) { put('ie'); }
		else if (key == 222) { put('soft'); }
		else if (key == 89) { put('j'); }
		else if (key == 87) { put('w'); }
		else if (key == 70) { put('f'); }
		else if (key == 86) { put('v'); }
		else if (key == 83) { put('s'); }
		else if (key == 90) { put('z'); }
		else if (key == 72) { put('h'); }
		else if (key == 82) { put('r'); }
		else if (key == 80) { put('p'); }
		else if (key == 66) { put('b'); }
		else if (key == 84) { put('t'); }
		else if (key == 68) { put('d'); }
		else if (key == 75) { put('k'); }
		else if (key == 71) { put('g'); }
		else if (key == 76) { put('l'); }
		else if (key == 188) { put(','); }
		else if (key == 190) { put('.'); }
		else if (key == 8) { put('back'); }
		else if (key == 13) { put('\n'); }
	}
}

//------------------------------------------------------------------------------

function up_to_down()
{
	
//------------------------------------------------------------------------------

	function process_u2d_char(c)
	{
		if (c == ' ') // space
		{
			put(' ');
		}
		else if ( (c == 'а') || (c == 'А') ) // rus
		{
			put('a');
		}
		else if ( (c == 'б') || (c == 'Б') ) // rus
		{
			put('b');
		}
		else if ( (c == 'в') || (c == 'В') ) // rus
		{
			put('v');
		}
		else if ( (c == 'г') || (c == 'Г') ) // rus
		{
			put('g');
		}
		else if ( (c == 'д') || (c == 'Д') ) // rus
		{
			put('d');
		}
		else if ( (c == 'е') || (c == 'Е') ) // rus
		{
			put('ie');
		}
		else if ( (c == 'ё') || (c == 'Ё') ) // rus
		{
			put('io');
		}
		else if ( (c == 'ж') || (c == 'Ж') ) // rus
		{
			put('ж');
		}
		else if ( (c == 'з') || (c == 'З') ) // rus
		{
			put('z');
		}
		else if ( (c == 'и') || (c == 'И') ) // rus
		{
			put('i');
		}
		else if ( (c == 'й') || (c == 'Й') ) // rus
		{
			put('j');
		}
		else if ( (c == 'к') || (c == 'К') ) // rus
		{
			put('k');
		}
		else if ( (c == 'л') || (c == 'Л') ) // rus
		{
			put('l');
		}
		else if ( (c == 'м') || (c == 'М') ) // rus
		{
			put('m');
		}
		else if ( (c == 'н') || (c == 'Н') ) // rus
		{
			put('n');
		}
		else if ( (c == 'о') || (c == 'О') ) // rus
		{
			put('o');
		}
		else if ( (c == 'п') || (c == 'П') ) // rus
		{
			put('p');
		}
		else if ( (c == 'р') || (c == 'Р') ) // rus
		{
			put('r');
		}
		else if ( (c == 'с') || (c == 'С') ) // rus
		{
			put('s');
		}
		else if ( (c == 'т') || (c == 'Т') ) // rus
		{
			put('t');
		}
		else if ( (c == 'у') || (c == 'У') ) // rus
		{
			put('u');
		}
		else if ( (c == 'ф') || (c == 'Ф') ) // rus
		{
			put('f');
		}
		else if ( (c == 'х') || (c == 'Х') ) // rus
		{
			put('h');
		}
		else if ( (c == 'ц') || (c == 'Ц') ) // rus
		{
			put('t');
			put('s');
		}
		else if ( (c == 'ч') || (c == 'Ч') ) // rus
		{
			put('t');
			put('ш');
			put('soft');
		}
		else if ( (c == 'ш') || (c == 'Ш') ) // rus
		{
			put('ш');
		}
		else if ( (c == 'щ') || (c == 'Щ') ) // rus
		{
			put('ш');
			put('soft');
		}
		else if ( (c == 'ъ') || (c == 'ъ') ) // rus
		{
			put(' ');
		}
		else if ( (c == 'ы') || (c == 'Ы') ) // rus
		{
			put('i');
		}
		else if ( (c == 'ь') || (c == 'Ь') ) // rus
		{
			put('soft');
		}
		else if ( (c == 'э') || (c == 'Э') ) // rus
		{
			put('e');
		}
		else if ( (c == 'ю') || (c == 'Ю') ) // rus
		{
			put('iu');
		}
		else if ( (c == 'я') || (c == 'Я') ) // rus
		{
			put('ia');
		}
		else if ( (c == 'a') || (c == 'A') ) // eng
		{
			put('a');
		}
		else if ( (c == 'b') || (c == 'B') ) // eng
		{
			put('b');
		}
		else if ( (c == 'c') || (c == 'C') ) // eng
		{
			put('k');
		}
		else if ( (c == 'd') || (c == 'D') ) // eng
		{
			put('d');
		}
		else if ( (c == 'e') || (c == 'E') ) // eng
		{
			put('e');
		}
		else if ( (c == 'f') || (c == 'F') ) // eng
		{
			put('f');
		}
		else if ( (c == 'g') || (c == 'G') ) // eng
		{
			put('g');
		}
		else if ( (c == 'h') || (c == 'H') ) // eng
		{
			put('h');
		}
		else if ( (c == 'i') || (c == 'I') ) // eng
		{
			put('i');
		}
		else if ( (c == 'j') || (c == 'J') ) // eng
		{
			put('d');
			put('sh');
		}
		else if ( (c == 'k') || (c == 'K') ) // eng
		{
			put('k');
		}
		else if ( (c == 'l') || (c == 'L') ) // eng
		{
			put('l');
		}
		else if ( (c == 'm') || (c == 'M') ) // eng
		{
			put('m');
		}
		else if ( (c == 'n') || (c == 'N') ) // eng
		{
			put('n');
		}
		else if ( (c == 'o') || (c == 'O') ) // eng
		{
			put('o');
		}
		else if ( (c == 'p') || (c == 'P') ) // eng
		{
			put('p');
		}
		else if ( (c == 'q') || (c == 'Q') ) // eng
		{
			put('k');
		}
		else if ( (c == 'r') || (c == 'R') ) // eng
		{
			put('r');
		}
		else if ( (c == 's') || (c == 'S') ) // eng
		{
			put('s');
		}
		else if ( (c == 't') || (c == 'T') ) // eng
		{
			put('t');
		}
		else if ( (c == 'u') || (c == 'U') ) // eng
		{
			put('u');
		}
		else if ( (c == 'v') || (c == 'V') ) // eng
		{
			put('v');
		}
		else if ( (c == 'w') || (c == 'W') ) // eng
		{
			put('w');
		}
		else if ( (c == 'x') || (c == 'X') ) // eng
		{
			put('k');
			put('s');
		}
		else if ( (c == 'y') || (c == 'Y') ) // eng
		{
			put('j');
		}
		else if ( (c == 'z') || (c == 'Z') ) // eng
		{
			put('z');
		}
		else if ( (c == 'ä') || (c == 'Ä') ) // eng
		{
			put('ia');
		}
		else if ( (c == 'ö') || (c == 'Ö') ) // eng
		{
			put('io');
		}
		else if ( (c == 'ü') || (c == 'Ü') ) // eng
		{
			put('iu');
		}
		else if ( (c == 'ë') || (c == 'Ë') ) // eng
		{
			put('ie');
		}
		else if (c == '\r')
		{
			put('\r');
		}
		else if (c == '\n')
		{
			put('\n');
		}
		else if (c == ',')
		{
			put(',');
		}
		else if (c == '.')
		{
			put('.');
		}
		else if (c == '\'')
		{
			put('soft');
		}
		else
		{
			//put(' '); // un-known symbol
		}
	}

//------------------------------------------------------------------------------

	var input = document.getElementById('input');
	var output = document.getElementById('output');
	var a, b; // 1st & 2nd symbols in buffer
	var i, j, j_last, len; // index of a & b
	len = output.value.length;
	
	check_output();
	
	if (len >= 2)
	{
		j_last = len - 1;
		i = 0; j = 1;
		input.value = '';
		a = output.value.charAt(0);
		b = output.value.charAt(1);
		if ( (a == 'е') || (a == 'Е') ) // rus
		{
			put('j');
			put('ie');
		}
		else if ( (a == 'ё') || (a == 'Ё') ) // rus
		{
			put('j');
			put('io');
		}
		else if ( (a == 'ю') || (a == 'Ю') ) // rus
		{
			put('j');
			put('iu');
		}
		else if ( (a == 'я') || (a == 'Я') ) // rus
		{
			put('j');
			put('ia');
		}
		else
		{
			process_u2d_char(a);
		}
		process_u2d_char(b);
		while (j < j_last)
		{
			j++;
			a = b;
			b = output.value.charAt(j);
			if (a != ' ')
			{
				process_u2d_char(b);
			}
			else
			{
				if ( (b == 'е') || (b == 'Е') ) // rus
				{
					put('j');
					put('ie');
				}
				else if ( (b == 'ё') || (b == 'Ё') ) // rus
				{
					put('j');
					put('io');
				}
				else if ( (b == 'ю') || (b == 'Ю') ) // rus
				{
					put('j');
					put('iu');
				}
				else if ( (b == 'я') || (b == 'Я') ) // rus
				{
					put('j');
					put('ia');
				}
				else
				{
					process_u2d_char(b);
				}
			}
		}
	}
	else if (len == 1)
	{
		input.value = '';
		a = output.value.charAt(0);
		if ( (a == 'е') || (a == 'Е') ) // rus
		{
			put('j');
			put('ie');
		}
		else if ( (a == 'ё') || (a == 'Ё') ) // rus
		{
			put('j');
			put('io');
		}
		else if ( (a == 'ю') || (a == 'Ю') ) // rus
		{
			put('j');
			put('iu');
		}
		else if ( (a == 'я') || (a == 'Я') ) // rus
		{
			put('j');
			put('ia');
		}
		else
		{
			process_u2d_char(a);
		}
	}
	else // len = 0
	{
	}
	
}

//------------------------------------------------------------------------------

function check_output()
{
	var input = document.getElementById('input');
	var output = document.getElementById('output');
	var a, i, i_last, len, new_string;
	len = output.value.length;
	if (len > 0)
	{
		i = 0;
		i_last = len - 1;
		new_string = '';
		while (i <= i_last)
		{
			a = output.value.charAt(i);
			if ( (a == 'a') || (a == 'b') || (a == 'c') || (a == 'd') || (a == 'e') || (a == 'f') || (a == 'g') || (a == 'h') || (a == 'i')
				 || (a == 'j') || (a == 'k') || (a == 'l') || (a == 'm') || (a == 'n') || (a == 'o') || (a == 'p') || (a == 'q') || (a == 'r')
			  || (a == 's') || (a == 't') || (a == 'u') || (a == 'v') || (a == 'w') || (a == 'x') || (a == 'y') || (a == 'z') )
			{
				new_string = new_string.concat(a);
			}
			else if ( (a == 'A') || (a == 'B') || (a == 'C') || (a == 'D') || (a == 'E') || (a == 'F') || (a == 'G') || (a == 'H') 
				|| (a == 'I') || (a == 'J') || (a == 'K') || (a == 'L') || (a == 'M') || (a == 'N') || (a == 'O') || (a == 'P') || (a == 'Q')
				|| (a == 'R') || (a == 'S') || (a == 'T') || (a == 'U') || (a == 'V') || (a == 'W') || (a == 'X') || (a == 'Y') || (a == 'Z') )
			{
				new_string = new_string.concat(a);
			}
			else if ( (a == 'а') || (a == 'б') || (a == 'в') || (a == 'г') || (a == 'д') || (a == 'е') || (a == 'ё') || (a == 'ж') || 
			(a == 'з') || (a == 'и') || (a == 'й') || (a == 'к') || (a == 'л') || (a == 'м') || (a == 'н') || (a == 'о') || (a == 'п') 
			|| (a == 'р') || (a == 'с') || (a == 'т') || (a == 'у') || (a == 'ф') || (a == 'х') || (a == 'ц') || (a == 'ч') || (a == 'ш') 
			|| (a == 'щ') || (a == 'ъ') || (a == 'ы') || (a == 'ь') || (a == 'э') || (a == 'ю') || (a == 'я') )
			{
				new_string = new_string.concat(a);
			}
			else if ( (a == 'А') || (a == 'Б') || (a == 'В') || (a == 'Г') || (a == 'Д') || (a == 'Е') || (a == 'Ё') || (a == 'Ж') 
				|| (a == 'З') || (a == 'И') || (a == 'Й') || (a == 'К') || (a == 'Л') || (a == 'М') || (a == 'Н') || (a == 'О') || (a == 'П')
				|| (a == 'Р') || (a == 'С') || (a == 'Т') || (a == 'У') || (a == 'Ф') || (a == 'Х') || (a == 'Ц') || (a == 'Ч') || (a == 'Ш')
				|| (a == 'Щ') || (a == 'Ъ') || (a == 'Ы') || (a == 'Ь') || (a == 'Э') || (a == 'Ю') || (a == 'Я') )
			{
				new_string = new_string.concat(a);
			}
			else if ( (a == ' ') || (a == 'ä') || (a == 'Ä') || (a == 'ö') || (a == 'Ö') || (a == 'ü') || (a == 'Ü') || (a == 'ë')
					 || (a == 'Ë') || (a == '\r') || (a == '\n') || (a == ',') || (a == '.') || (a == '\'') )
			{
				new_string = new_string.concat(a);
			}
			
			i++;
		}
		output.value = new_string;
	}
}

//------------------------------------------------------------------------------

function process_d2u_char(c)
{
	if ( (c == 'Ĭ') || (c == 'Ú') || (c == 'Û') || (c == '') ) // diacretic
	{
		return ''; // ignoring diacretics
	}
	else if (c == ' ') // space
	{
		return ' ';
	}
	else if (c == 'y') // lat
	{
		return 'M'; // lat
	}
	else if (c == '6') // lat
	{
		return 'N'; // lat
	}
	else if (c == '5') // lat
	{
		return 'NN'; // lat
	}
	else if (c == 't') // lat
	{
		return 'MM'; // lat
	}
	else if (c == ']') // lat
	{
		return 'A'; // lat
	}
	else if (c == 'h') // lat
	{
		return 'O'; // lat
	}
	else if (c == '.') // lat
	{
		return 'U'; // lat
	}
	else if (c == 'l') // lat
	{
		return 'Э'; // rus
	}
	else if (c == '~') // lat
	{
		return 'I'; // lat
	}
	else if (c == 'r') // lat
	{
		return 'V'; // lat
	}
	else if (c == 'e') // lat
	{
		return 'F'; // lat
	}
	else if (c == 'k') // lat
	{
		return 'Z'; // lat
	}
	else if (c == '8') // lat
	{
		return 'S'; // lat
	}
	else if (c == '9') // lat
	{
		return 'H'; // lat
	}
	else if (c == '7') // lat
	{
		return 'R'; // lat
	}
	
	else if (c == '') // lat
	{
		return 'Ш'; // lat
	}
	else if (c == '') // lat
	{
		return 'Ж'; // lat
	}
	
	else if (c == 'a') // lat
	{
		return 'K'; // lat
	}
	else if (c == 'j') // lat
	{
		return 'L'; // lat
	}
	else if (c == 'w') // lat
	{
		return 'B'; // lat
	}
	else if (c == 'q') // lat
	{
		return 'P'; // lat
	}
	else if (c == '2') // lat
	{
		return 'D'; // lat
	}
	else if (c == '1') // lat
	{
		return 'T'; // lat
	}
	else if (c == 's') // lat
	{
		return 'G'; // lat
	}
	else if (c == '=')
	{
		return ',';
	}
	else if (c == '-')
	{
		return '.';
	}
	else if (c == '\r')
	{
		return '\r';
	}
	else if (c == '\n')
	{
		return '\n';
	}
	else
	{
		return '?';
	}
}
//------------------------------------------------------------------------------

function down_to_up()
{
	var input = document.getElementById('input');
	var output = document.getElementById('output');
	var len = input.value.length;
	var i, i_last, result, a, b;
	
	if (len > 0)
	{
		output.value = '';
		result = '';
		if (len == 1)
		{
			a = input.value.charAt(0);
			result = result + process_d2u_char(a);
		}
		else
		{
			i = 1;
			i_last = len - 1; // to check all except the last symbol
			b = input.value.charAt(i-1);
			while (i <= i_last)
			{
				a = b;
				b = input.value.charAt(i);
				if ( (b != 'Ĭ') && (b != 'Ú') && (b != 'Û') && (b != '') ) // if b is not diacretic
				{
					result = result + process_d2u_char(a);
					i++;
				}
				else
				{
					// complicated symbol with diacretic sign
					if (b == 'Ĭ') // underline, "underlaut"
					{
						if (a == ']')
						{
							result = result + 'Ä';
							i++;
						}
						else if (a == 'h')
						{
							result = result + 'Ö';
							i++;
						}
						else if (a == '.')
						{
							result = result + 'Ü';
							i++;
						}
						else if (a == 'l')
						{
							result = result + 'Е'; // rus
							i++;
						}
						else
						{
							result = result + '?';
							i++;
						}
					}
					else if (b == '') // galka for space
					{
						if (a == ' ')
						{
							result = result + '\'';
							i++;
						}
						else
						{
							result = result + '?';
							i++;
						}
					}
					else if (b == 'Û') // galka for i
					{
						if (a == '~')
						{
							result = result + 'Y';
							i++;
						}
						else
						{
							result = result + '?';
							i++;
						}
					}
					else if (b == 'Ú') // galka for u
					{
						if (a == '.')
						{
							result = result + 'W';
							i++;
						}
						else
						{
							result = result + '?';
							i++;
						}
					}
					else
					{
						result = result + '?';
						i++;
					}
				}
			}
			// now, checking the last symbol
			a = b;
			result = result + process_d2u_char(a);
		}
		output.value = result;
	}
}