Playwright testruns: based number cpu off the cpu used it .
command: cpu get NumberofCores,NumberofLogicalProcessors


how do you handle json files?
in playwright, json files are handled ising native Node.js support-either by importing them directly for static test data or reading/writing them with fs for dynamic use cases.
1) reading JSON files(static Json import)
import data form'../data/testData.json'

2) reading/writing JSON using fs(Dynamic /Runtime JSON update)
import fs from 'fs';
// to read
const data = JSON.pase(fs.readFileSync('data/testData.json', 'utf-8'));

// to write
const result = {status: "PASS", time: '2s'};
fs.writeFileSync('output/result.json',JSON.stringify(result, null, 2));




run single test command:

npx playwright test <**.spec.ts>

run test sub flower using this command:
nox playwright test <subfilename> <**.spec.ts>

run test particular run the single test using title command:

nox playwright test -g '<title>'

run previous failed test cases command 
npx playwright test --last-failed

run testcases in ui mode: run all test in ui mode
npx playwright test --ui 

------------------------------------
REPORTS
----------
Allure reporter

step:1
-------

npm install -D allure-playwright

npm uninstall -D allure-playwright

step2:  genrate all report (playwright.config.ts or js) or command line 
------
['allure-playwright'] (or) npx playwright test --report=allure-playwright

step3: view allure report
-----
npm install -g allure-commandline
allure generate ./allure-results -o ./allure-report  (next step) allure open ./allure-report
allure generate ./allure-results -o ./allure-report --clean
------------------------------------------------------------------
json:
------
//const jsonPath = "testdata/data.json";
//const loginData:any=JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
--------------------------------------

npm install csv-parse
for(const data of records)
${data.emil}, ${data.password} data.email
if (data.validity.to)
----------------------------------------------------------------------

select dropdown :
---------------
await page.locator(#country).selectoption('india')  // visible text
await page.locator(#country).selectoption({value:'uk'})  // by using value attribute
await page.locator(#country).selectoption({label:'uk'})  // by using label
await page.locator(#country).selectoption({index:3})  // by using index

2) check number of options is the dropdown(count)
--------------------------------------------------
const dropdownOptions:Locator=page.locater(#country>options); //you can uses > or space in css selector
await expect(dropdownOptions).toHaveCount(10)

3) check an options present the dropdown
------------------------------------------
const optionsText:string[]=(await dropdownOptions.allTextcontens()).map(text=>text.trim());
console.log('optionsText')

expect(optionsText).toContain('japan');

4) printing options from the drop down
-----------------------------------------
 for (const option of optionsText)
 {
    console.log(option)
 }


 multiselect dropdown
 -----------------------------
 select dropdown :
---------------
await page.locator(#colors).selectoption(['Red','Blue','Green'])  // visible text
await page.locator(#colors).selectoption(['red','blue','green'])  // by using value attribute
await page.locator(#colors).selectoption({label:'Red'},{label:'Blue'})  // by using label
await page.locator(#colors).selectoption({index:0},{index:1})  // by using index

2) check number of options is the dropdown(count)
--------------------------------------------------
const dropdownOptions:Locator=page.locater(##colors>options); //you can uses > or space in css selector
await expect(dropdownOptions).toHaveCount(10)

3) check an options present the dropdown
------------------------------------------
const optionsText:string[]=(await dropdownOptions.allTextcontens()).map(text=>text.trim());
console.log('optionsText')

expect(optionsText).toContain('japan');

4) printing options from the drop down
-----------------------------------------
 for (const option of optionsText)
 {
    console.log(option)
 }


verify dropdown is sorted
-----------------------------
const dropDownOption:Locator=page.locator(#animals>option) //sorted
const dropDownOption:Locator=page.locator(#colors>option) //not sorted

console.log(await dropDownOptions.allTextContents());

const optionsText:string[]=(await dropDownOptions.allTextContents()).map(text=>text.trim())

const originalList:string[]=[...optionsText];
const sortedList:string[]=[...optionsText].sort();

console.log("originalList:", originalList);
console.log("sortedList:", sortedList);

expect(originalList).toEqual(sortedList)


-=====================================---------------------
verify dropdown contains duplicates
--------------------------------------
const dropDownOption:Locator=page.locator(#animals>option) // having duplicates
const dropDownOption:Locator=page.locator(#colors>option) //not having duplicates

const optionsText:string[]=(await dropDownOptions.allTextContents()).map(text=>text.trim())

const myset=new Set<string>(); //set -duplicates not allowed
const duplicates:string[]=[]; //array -duplicates allowed

for(const text of optionsText)
{
   if(mySet.has(text))
   {
      duplicates.push(text);
   }
   else{
      mySet.add(text);
   }
}

console.log("Duplicates list:",duplicates);

if(duplicates.length>0)
{
   console.log("Duplicates option found:",duplicates)
}else{
   console.log("No Duplicates option found....",)

}





/*const csvPath='testdata/data.csv';
const fileContent = fs.readFileSync(csvPath,'utf-8');

type LoginData = { email: string; password: string; validity: string };
const records = parse(fileContent, { columns: true, skip_empty_lines: true }) as LoginData[];
*/