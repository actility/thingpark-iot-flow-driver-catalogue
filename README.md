# Quick steps to develop and submit your device driver

For more details, please study the content of the `development-guide` folder that explains all details on how a driver works and prenests templates.

1. Visit the ThingPark X IoT Flow Driver Catalogue repository on Github:  
   https://github.com/actility/thingpark-iot-flow-driver-catalogue

2. Review the content of the `development-guide` folder that explains all details on how a driver
   works and prenests templates.

3. Sign in to github

4. Fork the repository under your own github account.  
   (Click on the "Fork" button on the top right of the page.)

5. Open a terminal window and clone the forked repository.
    ```
    git clone https://github.com/<YOUR_GITHUB_USERNAME>/thingpark-iot-flow-driver-catalogue.git
    ```

6. Start developing your driver from a template
    - Enter the repo's directory
      ```
      cd thingpark-iot-flow-driver-catalogue
      ```
    - Create a new branch for your driver  
      - Replace `name` by `@<producerId>/<application.producerId>-<application.moduleId>` if the `<producerId>` and `<application.producerId>` are different.
        Otherwise, replace `name` by `@<producerId>/<application.moduleId`.
      - Replace `<producerId>` to refer to the name/company of driver's developer.
      - Replace`<application.producerId>` to refer to the name of the device maker.
      - Replace `<application.moduleId>` to refer to the name of a specific device. 
        If the same driver is used for all devices of a given device maker than `<application.moduleId>` could be 'generic'.
        ```
        git checkout -b new-driver-<producerId>-<application.producerId>-<application.moduleId>
    - Copy the template
      ```
      mkdir <application.producerId>
      cp ./development-guide/templates/<simple-driver|advanced-driver>/ ./<application.producerId>/<application.moduleId>
      cd <application.producerId>/<application.moduleId>
      ```
    - Install the test framework (defined in the devDependencies field of the `package.json` file)
      ```
      npm install
      ```

7. Open your favourite IDE to edit the code of the actual directory  
   (If you use Visual Studio Code, execute the following command:)
    ```
    code .
    ```

8. Edit and update the `package.json` file
    - Don't change the `scripts`, `driver.type`, `driver.private`
      and `devDependencies` properties.
    - Don't change `main` if you are not developing an advanced driver.
    - Please note that the current driver framework does not support nodejs dependencies, 
      therefore you mustn't add any dependencies to the `package.json` file.
    - The `points` object is optional, and defines a common, vendor-independent ontology 
      for the decoded message payload.

9.  Replace the content of the index.js file so that the signature of the 
`decodeUplink`, `decodeDownlink`, `encodeDownlink` and `extractPoints` functions do not change.
Only the `decodeUplink` function is mandatory that's output is an object representing 
the decoded payload in any format the device maker prefers.
The optional `extractPoints` function can be used to convert the output of the `decodeUplink`
function to a vendor independent common ontology defined in the package.json file.

9. Replace the files in the `examples` and `errors` folder that are used for unit tests.
Those files should include real example payloads and their decoded versions sent by
the device.

10. Run the unit tests:
    ```
    npm test
    ```

11. Push your modified files back to your forked repo
    ```
    git status
    git add .
    git commit -m "new-device initial commit"
    git push origin new-driver-<producerId>-<application.producerId>-<application.moduleId>
    ```

12. Creat a pull request
    - On the github webpage of your forked repo click on the "Compare & pull request" button
    - Fill in the form
    - Click on the "Create pull request" button
