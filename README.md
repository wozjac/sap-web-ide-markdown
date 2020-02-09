# Markdown preview for SAP Web IDE (Cloud)
This extension adds a preview option for Markdown (.md) files.

## Installation
This extension is available for SAP Web IDE, cloud edition.

1. Add a new destination in the Cloud Platform Cockpit.  
URL: https://jwsapwebidemarkdown-p791767trial.dispatcher.hanatrial.ondemand.com
![destination](http://public_repo.vipserv.org/images/markdown/destination_settings.png)  
Name and description - choose as you like.

2. Go to Extensions in SAP Web IDE (refresh if already opened) - the extension should be available 
(wait some minutes if not and refresh). 

![extension](http://public_repo.vipserv.org/images/markdown/web-ide-extensions.png)  
3. switch to "On". 

## Usage
When a Markdown file is opened (.md file extension), the preview icon is showed in the right pane.

![preview icon](http://public_repo.vipserv.org/images/markdown/preview_icon.png)

Clicking on it will open a new tab/window with a HTML preview (Github CSS is used for styling).

![md preview](http://public_repo.vipserv.org/images/markdown/preview.png)

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
- DOMPurify (https://github.com/cure53/DOMPurify) for sanitazing HTML output

## License
This plugin is licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Author
Feel free to contact me: wozjac@zoho.com or via LinkedIn (https://www.linkedin.com/in/jacek-wznk).
