import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  /**************************************************************************** */
  // Filtered Image Endpoint
  app.get("/filteredimage", async (req, res) => {
    let { image_url } = req.query

    // 1. validate the image_url query
    if (!image_url) {
      return res.status(400).send(`Error: the required query parameter image_url is missing or malformed.`)
    }

    // 2. call filterImageFromURL(image_url) to filter the image
    let filteredpath: string
    try {
      filteredpath = await filterImageFromURL(image_url)
    } catch(err) {
      switch (err) {
        case 'UrlError':
            return res.status(404).send(`Error: image_url is not accessible`)
        default:
            return res.status(422).send(`Error: problem occured while filtering the image.`)
      }
    }

    // 3. send the resulting file in the response
    res.status(200).sendFile(filteredpath, async (err) => {
      if (err) {
        console.error(err)
        return res.status(500).send(`Error: problem occured while sending image`)
      }

      // 4. deletes any files on the server on finish of the response
      try {
        await deleteLocalFiles([filteredpath])
      } catch (e) {
        console.error(e)
      }
    })
  });
  /**************************************************************************** */

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();