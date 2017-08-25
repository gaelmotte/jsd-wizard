# jsd-wizard
Jira Service Desk Add-on adding wizard capability to customer portal
Quick and dirty front only changes. Plugin is only here to inject CSS and JS.

## Usage
Create a Customer request in JSD, and add a couple of fields.
Add `@@<Step Title>@@` within the description of the fields you wan to wizardise.
Fields will be regrouped by identitical `<Step Title>`, yet will keep the ordering of the request configuration.
Fields without that tag in their description will be displayed above wizzard, hence will always be visible, allowing common/main fields.

## Install as webressource with script runner
Following instructions here https://scriptrunner.adaptavist.com/latest/jira/fragments/WebResource.html, you can simply download JS and CSS resources and add them to be loaded by script runner.


