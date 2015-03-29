[![Stories in Ready](https://badge.waffle.io/joshuavial/sustain.png?label=ready&title=Ready)](http://waffle.io/joshuavial/sustain) [![Join the chat at https://gitter.im/joshuavial/sustain](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/joshuavial/sustain?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Sustain

Distributed payment system for open source development

# Idea
Open source development contributes substantial value to the economy but often payment for that value does not flow back to the people who create it. Currently open source developers are paid primarily with reputation and our hypothesis is that a direct financial economy which pays people fairly for the value they contribute to the commons will be more efficient and productive.

Sustain exists to provide an easy, transparent and decentralized protocol so we can increase the amount of open source funding experiments that are run and make it clear where money goes once it enters the ecosystem.

The heart of the idea is to add input and output crypto currency addresses (initially bitcoin) to package metadata and some simple cli tools so we can easily send money to the underpaid contributors that commercial applications rest upon.

# Prototype

* `sustain init <bitcoin address>` configure package.json with sustain meta data
* `sustain add <username> <bitcoin_address>` add a new contributor who will receive payments
* `sustain build dependencies` query dependencies and add them to sustain data with weight of 0
* `sustain list` show all contributors and depencies with proportion of funds they will receive
* `sustain pay` query package wallet for total balance and distribute it to the dependencies and contributors
* `sustain report` build a simple report showing total financial flow through the input wallet and where the funds have been sent
* build a rough hack to the MIT license we can get legal feedback on

# Later

* validate username of contributors via signed tweets or github posts/repos to demonstrate they have access to the bitcoin address assigned to them

