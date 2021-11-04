import './index.css';

import { User } from './entity/User'
// import { User } from "./entity/User";
import { createConnection } from "typeorm";

/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
 

console.log('👋 This message is being logged by "renderer.js", included via webpack');
setTimeout(() => {
    console.log("You can also get posts from the second process:");
    
    createConnection({
        'type': 'better-sqlite3',
        // 'database': 'database.sqlite',
        'database': 'database.sqlite',
        'synchronize': true,
        'logging': false,
        // 'dropSchema': true,
        // 'entities': [
        //   DocumentModel,
        //   RemoteUnsyncModel
        // ]
        entities: [
            User
            // "./entity/**/*.ts"
        ],
      }).then(async connection => {
    
        console.log("Inserting a new user into the database...");
        const user = new User();
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.age = 25;
        await connection.manager.save(user);
        console.log("Saved a new user with id: " + user.id);
    
        console.log("Loading users from the database...");
        const users = await connection.manager.find(User);
        console.log("Loaded users: ", users);
    
        console.log("Here you can setup and run express/koa/any other framework.");
    
    }).catch(error => console.log(error));
    }, 1000);
