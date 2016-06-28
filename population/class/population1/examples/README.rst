Examples
===============================================================================

TODO
-------------------------------------------------------------------------------

* Add examples (at least one) in this directory
* Update contents of this 'README.rst' file

Example Guideline
-------------------------------------------------------------------------------
Part A - For Oracle VirtualBox:

Using Python to Run Analysis on U.S. Census Data and Labor Force Data:
Clone the github project  repository::

$ git clone https://github.iu.edu/edenbarn/sw-project-template.git

First we need to install the required packages::

$ sudo apt-get install python-pip
$ sudo pip install pymongo

Make sure that a connection is open to your MongoDB::

$ mongod --dbpath=/home/username/data/db

In a second terminal, and go to the below folder to run PythonScript.py file::

$ cd /sw-project-template/src
$ python PythonScript.py

You should see a message that says “Connected successfully!” You should also see a new file in your directory titles “rate2000”. The program looks for all of the unemployment rates that are above 10 and returns them in a csv document.
The csv file can now be used for easy visualization. Congratulations, you are finished!







=======



Part B - For FutureSystems:

Required Manual Software Installation:

Login to india.futuresystems.org using Putty.

Enter to kilo on India by using::

$ source ~/.cloudmesh/clouds/india/kilo/openrc.sh
$ source ~/.cloudmesh/clouds/india/kilo/fg491

Install required softwares::

$ sudo apt-get install python-pip
$ module load openstack

Activate the virtualenv::

$ virtualenv $HOME/bdossp-sp16
$ source $HOME/bdossp-sp16/bin/activate

Start an ssh agent and add your credentials::

$ eval $(ssh-agent -s)
$ ssh-add ~/.ssh/id_rsa

Install Ansible::

$ pip install --trusted-host pypi.python.org ansible

Clone the github project  repository::

$ git clone https://github.iu.edu/edenbarn/sw-project-template.git
$ cd /sw-project-template/src/playbook-codes

Create a VM instance with following details::

$ nova boot --image Ubuntu-15.10-64 --flavor m1.small --key-name id_rsa --nic net-id=e5228c15-38af-4f91-a6de-1590d399427e quickstart-$USER

Get the IP address of this VM using nova list command and update the inventory.txt file in the current folder with that IP address.

To install MongoDB on your VM instance::

$ ansible-playbook -i inventory.txt -c ssh mongo-install.yml

Login to the VM instance using::

$ ssh ubuntu@IP_Address_of_VM

Switch to become root user and create a data directory for Mongodb::

$ sudo su -
$ mkdir -p /data/db
$ mongod --dbpath=/data/db

Open a new terminal and then run mongo::

$ mongo
$ use PopulationData
$ exit

Create data collections using below commands::

$ cd sw-project-template/data
$ cp countypopulationchange.csv ~/PopulationData
$ cp laborforcedata2010.csv ~/PopulationData
$ cp laborforcedata2000.csv ~/PopulationData

Run the sample program PythonScript.py using::

$ python PythonScript.py

You should see a message that says “Connected successfully!” You should also see a new file in your directory titles “rate2000”. The program looks for all of 
the unemployment rates that are above 10 and returns them in a csv document.

The csv file can now be used for easy visualization. Congratulations, you are finished!

