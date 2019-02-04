# Markdown preview for SAP Web IDE (Cloud)
This extension adds a preview option for Markdown (.md) files.

## Installation
This extension is available for SAP Web IDE, cloud edition.

1. Add a new destination in the Cloud Platform Cockpit.  
URL: https://jwsapwebidemarkdown-p791767trial.dispatcher.hanatrial.ondemand.com
![destination](https://www.mediafire.com/convkey/1d5d/4x2to18b0343lo46g.jpg)  
Name and description - choose as you like.

2. Go to Extensions in SAP Web IDE (refresh if already opened) - the extension should be available 
(wait some minutes if not and refresh). 

![extension](https://www.mediafire.com/convkey/76de/891ulbc2r0y8yjf6g.jpg)
3. switch to "On". 

## Usage
When a Markdown file is opened (.md file extension), the preview icon is showed in the right pane.

![preview icon](https://www.mediafire.com/convkey/ef92/3c9vxtc19z74b8f6g.jpg)

Clicking on it will open a new tab/window with a HTML preview (Github CSS is used for styling).

![md preview](https://www.mediafire.com/convkey/cae3/lm4qlrkctwwy23v6g.jpg)

## Configuration
By default, Github flavor (preset) is used for Showdown. For passing options (https://github.com/showdownjs/showdown#options) create 
.mdpreview file in the root folder of your project and:  
- provide individual options which will be passed to Showdown, for example:  
```
{
	"showdownConfig": {
		"openLinksInNewWindow": true,
		"simplifiedAutoLink": true
	}
}
```
or set other desired flavor (https://github.com/showdownjs/showdown#flavors):  
```
{
	"flavor": "original"
}
```

## Credits
- Showdown as a converter: [https://github.com/showdownjs/showdown](https://github.com/showdownjs/showdown)

## License
This plugin is licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Author
Feel free to contact me: wozjac@zoho.com or via LinkedIn (https://www.linkedin.com/in/jacek-wznk).
