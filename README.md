# Yahoo! Weather tile widget

This widget is a sample of using the yahoo weather api to get the current weather conditions of the user's (actually it is the device's :)) location.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You already should have a working website with an html file, where this widget has to be inserted


### Installing

1. Extract the 'Archive.zip' file to the location of the host's html file.
2. Insert the following lines into the host's html file

```
<script type='text/javascript'>
    document.write('<div class="cvent-container"><div class="loader"></div></div>');
    document.write('<script type="text/JavaScript" src="weatherBootstrap.js"></script');
</script>
```
## Running sample 

Open the file host's html file (via localhost/directly) in the browser and you should see a loader for this widget.

## Behind the scenes

1. The widget asks the user for the permission for getting the user's (actually it is the device's) location.
2. Once the permission is given, the widget calls the yahoo weather API for weather forcast
3. When the yahoo API replies, the wdiget displays the details on the browser.

## Known bugs

* This widget might not get centered in the container 
* I do not have IE9 at my end, so could not really test there.

## Hidden features (not a lot - fortune in these cookies)

* Move the mouse pointer over the tile and it will glow.
* Move the pointer over the img and it will rotate.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* google
* stackoverflow


