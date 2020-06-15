/**
 * A initialization code to be run on server startup.
 */
import {createSchemas} from "./parseServer/schema";


const bootstrap = () => {
  createSchemas()

  //TODO Register Parse classes here

}

export default bootstrap