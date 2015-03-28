[![Stories in Ready](https://badge.waffle.io/joshuavial/sustain.png?label=ready&title=Ready)](http://waffle.io/joshuavial/sustain)

# Sustain
Distributed payment system for open source development

# Vision
Open source development contributes substantial value to the economy but often payment for that value does not flow back to the people who create it. Currently people are paid in primarily with reputation and our hypothesis is that a direct financial economy which pays people fairly for the value they contribute to the commons will be more efficient and productive.

# Idea
We add input and output crypto currency addresses (initially bitcoin) to package metadata and some simple cli tools so we can easily send money to the underpaid giants our commercial applications rest upon.

We build sustain clauses that can be added to popular open source licenses which require any application which includes that package to
a) implement the same sustain clauses in its license
b) if app has a http api support a /.sustain.json method which publishes the sustain data of the app
c) if app has a public website must support a /.sustain.html page which publishes the sustain data of the app

The sustain data would consist of the app wallet address (financial inputs) and the contributor and dependency addresses (outputs) which can be used to audit the financial flow through the app.

People aren't forced to send money to the libraries they use but they are required to publicly demonstrate the amount of funding they are sending into the open source ecosystem so they can fully participate in the reputation economy.

# Prototype

* `sustain init <bitcoin address>` configure package.json with sustain meta data
* `sustain add <username> <weight> <bitcoin_address>` add a new contributor who will receive payments
* `sustain build dependencies` query dependencies and add them to sustain data with weight of 0
* `sustain list` show all contributors and depencies with proportion of funds they will receive
* `sustain pay` query package wallet for total balance and distribute it to the dependencies and contributors
* `sustain report` build a simple report showing total financial flow through the input wallet and where the funds have been sent
* build a rough hack to the MIT license we can get legal feedback on

# Next up

* validate username of contributors via signed tweets or github posts/repos to demonstrate they have access to the bitcoin address assigned to them

