Installation
 
===============================================================================
 
Installation commands/instructions are listed here for both the Oracle 
VM Virtual Box with Ubuntu and Also FutureSystems with Ansible Automation at the bottom
 

Prerequisite- Ubuntu VM Virtual Box with Ubuntu & Futuresystems with 
Ansbile
 
-------------------------------------------------------------------------------
 
Section 1 : Running Project on Oracle VM Virtual Box with Ubuntu and 
Hadoop Installtion
 
==============================================================================

# Download and install virtualBox virtual machine manager from: 
"http://www.oracle.com/technetwork/server-storage/vm/template-1482544.html"

# After installing, click "new" to create your machine with the 
following conditions: Name = PopulationAnalysis, Type = Linux, Version 
Ubuntu (64-bit)

# Create the virtual machine with a virtual hard drive and use the VDI 
(virtual disk image) option. Choose to dynamically allocate it using 
roughly 1500MB

# From the virtual machine, download the Ubuntu desktop from: 
"http://www.ubuntu.com/desktop"

# Navigate to the settings within your virtual machine, go to the 
storage option and click on the "add optical drive" icon just to the 
right of the Conroller: IDE

# Select choose disk and click on the Ubuntu desktop in your downloads 
folder

# Now start the virtual machine and install Ubuntu when prompted

# After downloading Ubuntu and restarting, navigate to Firefox and go 
to the following link (http://www-eu.apache.org/dist/hadoop/common/) to 
download Hadoop 2.7.1 version ending in tar.gz

# In your virtual machine, navigate to your home directory and create a 
new folder titled "hadoop"::

$cd ~/home
$mkdir hadoop

# Java needs to be downloaded and installed. Use Firefox to navigate to 
the Java home page (http://www.oracle.com/technetwork/java/javase/downloads/index.html)

# Select the JDK download and download the tar.gz version for Linux 64 
bit systems. Also, the JRE version will also need to be downloaded. 
Save these files in the downloads directory

# Move the downloaded hadoop file into the hadoop directory you created 
within the home directory

# In your virtual machine, open up a terminal and switch to the hadoop 
directory you just created::

$cd hadoop

# Use the ls command to see the hadoop-2.7.1.tar.gz file is available

# Use command "tar xzf hadoo*" to extract the files within the hadoop 
directory, and then use the ls command to see that the file has been 
extracted::

$tar xzf hadoo*

# Now, navigating back to our root directory, let's make sure Java is 
functioning by entering the following commands::

$cd  ~
$java --terminal
$sudo mkdir -p /usr/local/java

# Navigate back to the Downloads directory and follow the commands 
below to move and extract the Java files::

$cd Downloads
$sudo cp -r jre-*.tar.gz /usr/local/java
$sudo cp -r jdk-*.tar.gz /usr/local/java
$cd /usr/local/java
$sudo tar zxvf jdk*.tar.gz
$sudo tar zxvf jre*.tar.gz

# Now we will add the variables to the path of our environment using 
the commands below::

$sudo gedit /etc/profile

# When the profile text appears, go to the bottom of the sheet and add 
the following following lines making sure that your java and hadoop 
versions as well as your paths and directories are correct::

JAVA_HOME=/usr/local/java/jdk1.8.0_77

PATH=$PATH:$JAVA_HOME/bin

JRE_HOME=/usr/local/java/jre1.8.0_77

PATH=$PATH:$JRE_HOME/bin

HADOOP_INSTALL=/home/username/hadoop/hadoop-2.7.1

PATH=$PATH:$HADOOP_INSTALL/bin

export JAVA_HOME

export JRE_HOME

export PATH

# Now to let Ubuntu know where we have stored Java enter the following 
commands::

$sudo update-alternatives --install “/usr/bin/java” “java” “/usr/local/java/jre1.8.0_77/bin/java” 1
$sudo update-alternatives –-install “/usr/bin/javac” “javac” “/usr/local/java/jdk.1.8.0_77/bin/javac” 1 
$sudo update-alternatives –-install “/usr/bin/javaws” “javaws” “/usr/local/java/jre.1.8.0_77/bin/javaws” 1
$sudo update-alternatives –-set java /usr/local/java/jre1.8.0_77/bin/java
$sudo update-alternatives –-set javac /usr/local/java/jdk1.8.0_77/bin/javac
$sudo update-alternatives –-set javaws /usr/local/java/jre1.8.0_77/bin/javaws

# From the /usr/local/java directory, refresh the profile, check your 
Java version and path to correct directory using the following 
commands::

$cd /usr/local/java
$. /etc/profile
$java -version
$echo $JAVA_HOME

# Now, change your directory to the hadoop-2.7.1 that was created and 
run a sample test program using the following commands::

$cd ~/hadoop/hadoop-2.7.1
$mkdir input
$cp etc/hadoop/*.xml input
$bin/hadoop jar ./share/hadoop/mapreduce/hadoop-mapreduce-examples*.jar 
$grep input output 'dfs[a-z.]+'
$ls output

# You should have a line in the terminal displaying "part-r-00000_SUCCESS



1.2: Installing MongoDB and Uploading Data

-----------------------------------------------------------------------------

# Now we need to install MongoDB from the following website 
"https://www.mongodb.org/downloads#production”

# Create a directory called MongoDB within your home directory and move 
your downloaded file to this location. Then extract the file

# Make a path to the MongoDB environment by clicking on the bin 
properties and viewing the path::

$gedit ~/.bashrc

# To add your MongoDB path, add these lines to the bottom of the file 
that comes up, then save and close the file::

export MONGODB_HOME=/home/username/mongodb/mongodb-linux-x86_64-ubuntu1404-3.2.5
export PATH=$MONGODB_HOME/bin:$PATH

# Create a path for MongoDB to store files::

$cd ~
$mkdir data
$cd data
$mkdir db
$cd ~
$mongod --dbpath=/home/username/data/db
$sudo apt install mongodb-server

# Now seeing that the port is connected, leave this terminal open and 
open another instance of the terminal 

# In your newly opened terminal, run the following commands to create a 
database for importing and storing your data in MongoDB::

$mongo
$use PopulationData
$exit

# To import our data change your working directory to the location of 
where you have stored your data or csv files

# In this case I have chosen to create a directory called PopulationData 
on my virtual machine that contains the 3 data sets::

$cd PopulationData 
$mongoimport --db PopulationData --collection populationchange --type csv --headerline --stopOnError --ignoreBlanks --file countypopulationchange.csv
$mongoimport --db PopulationData --collection laborforce2000 --type csv –-headerline --stopOnError --ignoreBlanks --file laborforcedata2000.csv
$mongoimport --db PopulationData --collection laborforce2010 --type csv –-headerline --stopOnError --ignoreBlanks --file laborforcedata2010.csv

# To enter back into MongoDB and view the collections and documents 
that were just imported as well as view some of the data, enter the 
following commands::

$mongo
$use PopulationData
$show collections
$db.populationchange.findOne()
$db.laborforce2000.findOne()
$db.laborforce2010.findOne()
$exit

1.3 Integrating Hadoop and MongoDB

---------------------------------------------------------------------------

# Now we will integrate Hadoop with MongoDB::

$cd /home/username/hadoop/hadoop-2.7.1/etc/hadoop
$gedit hadoop-env.sh

# In the file that opens, find the line that reads "export 
JAVA_HOME=${JAVA_HOME}" and replace this entire line with the following 
text::

$export JAVA_HOME=/usr/local/java/jdk1.8.0_77

# After editing, save the file and close, return to the terminal and 
entire the following commands to verify your changes::

$. hadoop-env.sh
$echo $JAVA_HOME

# Install git and clone the hadoop-mongo connector from a github 
repository::

$sudo apt-get install git
$git clone https://github.com/mongodb/mongo-hadoop.git
$cd mongo-hadoop
$ln -s ~/hadoop/hadoop-2.7.1 ~/hadoop/binaries

# Update your hadoop environment variables by entering the commands 
below into the terminal::

$export HADOOP_HOME=/home/username/hadoop/hadoop-2.7.1 
$export PATH=$PATH:$HADOOP_HOME/bin hadoop version 
$export HADOOP_CLASSPATH=$HADOOP_HOME/lib 

# Be sure you are in the mongo-hadoop directory that was just created,we will now build the 
mongo-hadoop connector from source for Apache +Hadoop Version 2.7.1:: 

$./gradlew jar 
$Phadoop_version='2.7.1'

# To install the latest MongoDB Java Driver, 
execute the following commands (be sure you are in the directory):: 

$~/hadoop/hadoop-2.7.1/etc/hadoop/mongo-hadoop 
$wget http://repo1.maven.org/maven2/org/mongodb/mongo-java-driver/3.2.2/mongo-java-driver-3.2.2.jar 
$cp /home/username/hadoop/hadoop-2.7.1/etc/hadoop/mongo-hadoop/build/libs/mongo-hadoop-1.5.2.jar /home/username/hadoop/binaries/lib 
$mv mongo-java-driver-3.2.2.jar /home/username/hadoop/binaries/lib  

# Run the following command to test if the Mongo-Hadoop connector was installed successfully::
 
$./gradlew sensorData 


1.4: Running Python Script on MongoDB data for Analysis

---------------------------------------------------------------------------------------------------------------------------

#Now to run the python script created by us on 
the U.S. Census and U.S. Labor Statistics

# First we need to install the required packages::

$ sudo apt-get install python-pip 
$ sudo pip install pymongo

# Make sure that a connection is open to your MongoDB:: 

$ mongod --dbpath=/home/username/data/db

# In a second terminal, save the PythonScript.py file anywhere in your directory and run this 
command::

$ python PythonScript.py

# You should see a message that says “Connected successfully!” You should also see a new file in your 
directory titled “rate2000”. The program looks for all of the unemployment rates that are above 10 and returns them in a csv 
document. 

# The csv file can now be used for easy visualization. 
Congratulations, you are finished!


 Section 2: Project Installation for FutureSystems with Ansible Automation


=================================================================================================

# Login to india.futuresystems.org using Putty::

$ sudo apt-get install python-pip
$ module load openstack
$ virtualenv $HOME/bdossp-sp16
$ source $HOME/bdossp-sp16/bin/activate
$ pip install --trusted-host pypi.python.org ansible
$ git clone https://github.iu.edu/edenbarn/sw-project-template.git
$ cd /sw-project-template/src/playbook-codes

# Update the inventory.txt file with the IP address of your VM 
instance::

$ ansible-playbook -i inventory.txt -c ssh mongo-install.yml

# Go to home directory and become root user::

$ mkdir -p /data/db
$ mongod --dbpath=/data/db

# Open a new terminal and then run::
================================================================================================

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


