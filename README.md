[![Code Climate](https://codeclimate.com/github/joshuavial/sustain/badges/gpa.svg)](https://codeclimate.com/github/joshuavial/sustain)
[![Stories in Ready](https://badge.waffle.io/joshuavial/sustain.png?label=ready&title=Ready)](http://waffle.io/joshuavial/sustain) [![Join the chat at https://gitter.im/joshuavial/sustain](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/joshuavial/sustain?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Sustain

Distributed payment system for open source developers and Distributed Autonomous Organisations

# Idea

Open source development contributes substantial value to the economy but often payment for that value does not flow back to the people who create it. Currently open source developers are paid primarily with reputation and our hypothesis is that a direct financial economy which pays people fairly for the value they contribute to the commons will be more efficient and productive.

Sustain exists to provide an simple, transparent and decentralized protocol so we can easily distribute revenue generated by projects to the people who made the projects possible.

The heart of the idea is to add input and output crypto currency addresses (initially bitcoin) to package metadata and some simple command line tools so we can easily send money to the contributors and dependencies which make a project possible.

# sustain.json

The sustain.json file contains the information of how money received by the input address will be distributed. It acts a little bit like a shareholders register in a company and includes

* address: the bitcoin address for inputs to this project
* contributors: an array of addresses for the individuals who will be paid
* dependencies: an array of addresses for the packages this project is dependent on

Each address has a weight which determines how much will be distributed to each address. So a payee with a weight of 100 will receive 10 times the amount of money as one with a weight of 10. If a payee has a weight of 0 they will receive no payments.

# Usage

`npm install -g sustain`

### sustain init <project-bitcoin-address>
Creates a sustain.json file in the current directory

### sustain add <username> <user-bitcoin-address>
Add a contributor to your sustain.json file

### sustain update
Add all your dependencies to sustain.json with a weight of 1 

### sustain list
List all the accounts which will have funds distributed to them along with the percentage of funds they will receive. If a dependency does not have a sustain.json file then it's weight will be set to 0.

### sustain balance
Show the amount of bitcoins in the project account

### sustain distribute
Distribute all funds in project account to contributors.
You will need to have the WIF key for the project account in the environment var SUSTAIN_WIF_KEY.
