import "@babel/polyfill";

import chalk from "chalk";

import { argParser, ascii, updateNotifier, spinner } from "./utils";
import { copyFiles, getType, getName } from "./steps";

(async () => {
  try {
    // Initialize argParser, this is here because -v and -h shouldn't spam the ascii text
    const { type, name } = argParser.parseArgs();

    // Fancy ascii text
    const asciiText = await ascii("create nOS dApp");
    console.log(chalk.green(asciiText));

    // Check if updates are available
    if (process.env.NODE_ENV !== "development") {
      updateNotifier();
    }

    // Get arguments
    const dappType = await getType(type);
    const dappName = await getName(name);

    // The work
    spinner.start();
    await copyFiles(dappType, dappName);
  } catch (err) {
    console.log(chalk.red.bold(err));
  }
})();
