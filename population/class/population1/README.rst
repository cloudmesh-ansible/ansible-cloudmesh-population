New Content
====================

Description
--------------
this is a program that provides a visual representation of .....

Original content
====================
Final Report
===============================================================================
Big Data Open Source Software: Indiana University

May 2, 2016

Eden Barnett - Project Lead - edenbarn@umail.iu.edu - Indiana University

Priyanka Jadhav - pnjadhv@umail.iu.edi - Indiana University

Jeff Sustarsic - jeffsust@umail.iu.edu - Indiana University

Project Description

      This project uncovers some of the key factors behind why population numbers change. We highlight population numbers by county and use statistical data to discover trends. 
      Data sets were made publicly available by the U.S. Census Bureau and the United States Department of Labor: Bureau of Labor Statistics. The first data set is the population change for counties in the United States and Puerto Rico: 2000 to 2010. The other two data sets are unemployment rates in counties in the United States and Puerto Rico, one for 2000 and the other for 2010. We will derive meaningful insight between population changes in counties and unemployment rate, specifically how unemployment rates appear to affect population changes. We pin point specific counties of the United States that show drastic changes.
      Data sets are loaded into MongoDB.For the purposes of our data set, analysis was done utilizing a Python script which pulls data directly from MongoDB, does a short analysis, and exports the data in CSV format. Visualization is done on Tableau.
      Platforms for running this analysis are shown both on the Oracle VM Virtualbox with Ubuntu, and also on FutureSystems with Ansible automation.
      
Problem Statement

	Big Data open source software such as Hadoop and MongoDB are incredibly important for analyzing data that has large volume and variety. Therefore, it is necessary to learn how to utilize these tools. We are using the U.S. Census and U.S. Labor statistics to accurately display how to integrate this software into powerful tools to be used for Big Data analysis. 

Purpose and Objectives

	Although our data sets are not "Big Data" in their nature, they are still sufficient in order to provide examples on how data is stored, and analyzed utilizing Big Data open source software tools. The purpose of this project is to use these data sets in order to provide a start to finish example on how to use them; from the storage stage to using Python and Hadoop for analysis, and finally to report findings in visualization format. 

Results

	The results of this project are available on our project GitHub page located at this hyperlink: https://github.iu.edu/edenbarn/sw-project-template where you will find an explanation of where the data sets came from, data cleaning solutions, the data sets in an already cleaned file, software orchestration, implementation, and the python script used for analysis (PythonScript.py).
	Our visualizations are available on Tableau Public for 
interactive use at this link: 
https://public.tableau.com/profile/eden3065#!/ where we have provided 
visualizations for all of our analysis. Snap shots of what those look 
like are in the addendum at the end of this document. Counties in Puerto 
Rico were manually excluded from the visualization. The unemployment 
visualizations are displaying counties which showed a drastic increase 
un unemployment rates. For the year 2000, the script was run to show any 
counties that had an unemployment rate greater than 10. Not 
surprisingly, for the 2010 unemployment rate data set, there were many 
more drasticly high unemployment rates because of the economic crash in 
the mid 2000's. Because of this, the script was changed to show 
unemployment rates that were greater than 15.

Findings

      Overall population increased in the U.S. from 2000 to 2010 as evidenced by the higher frequency of green areas compared to red in our first visualization. Most of the population expansion appears in the Western and Southern regions of the U.S. We do not see much growth in the Northeast and Midwest regions of the country over the last decade. Counties in Florida, Georgia, and the DC area seemed to experience the most growth in population from 2000 to 2010. Also, California, Colorado, and Nevada show significant growth over the decade long period.
      It could be expected that we would see significant population declines in Louisiana given the events of natural disasters such as Hurricane Katrina that defined the decade. In fact, four of the top five greatest population decreases by county occurred in Louisiana and Mississippi. While there are many factors at play influencing population change, this event is one that likely had a major impact on the statistics.
      The highest unemployment rates by county exist in the southern states (TX, CA, AZ) specifically along the U.S./Mexico border. It is compelling that the counties with the highest unemployment rates fall on the Mexico border where immigration issues could be a plausible factor. We also see unemployment concerns in Mississippi and Alabama, geographic areas that are historically known to be ranked less favorably in educational arenas. Oddly, the Michigan Upper Peninsula shows high percentages of unemployment rates.

Implementation

Part A - Oracle Virtualbox Ubuntu
Required Manual Software Installation:

	A detailed software installation script is available on the project GitHub page. Detailed software integration instructions are located there as well. Below is a list of locations on where to download the required software.

Oracle VM Virtualbox https://www.virtualbox.org/wiki/Downloads
Ubuntu Desktop http://www.ubuntu.com/download
Hadoop 2.7.1 via Mirror http://www-eu.apache.org/dist/hadoop/common/
JAVA JRE AND JDK http://www.oracle.com/technetwork/java/javase/downloads/index.html
MongoDB https://www.mongodb.org/downloads#production

MongoDB Data Import:
1) Go to the terminal and type in the command:

$ gedit ~/.bashrc

2) To add your MongoDB path, add these lines to the very bottom of the file that comes up, then save the file and close.

$ export MONGODB_HOME=/home/username/mongodb/mongodb-linux-x86_64-ubuntu1404-3.2.5

$ export PATH=$MONGODB_HOME/bin:$PATH

3) MongoDB has a default setting where it looks for a place to store files, so we need to create a path to do that. I create a data/db file in the home directory. Go to this directory and make a copy of the path where the directory is located. We run this command with the location and name of the file we created. This is what mine looked like:

$ mongod --dbpath=/home/username/data/db

4) You should see that the port is connected: This terminal should remain open so that you stay connected to MongoDB. You simply open a separate terminal to being working.

5) We begin working by opening a 2nd terminal and typing the command "mongo"

6) Now you need to create a database where your data will be stored. To do this, simply type "use" and the name of the database that you want to create. In this example, I have created the database "PopulationData" by typing "use PopulationData"

7) Now we need to load the data into the database we just created using the ìmongoimportî command. To do this we will need to exit out of the mongo shell, as mongoimport was designed to work directly from the CMD prompt. However, leave the other CMD prompt screen open showing your connection to MongoDB. After exiting out of mongo shell, run this command with the location of the csv file you are loading at the end. You must be working from the directory where the file is located. Do this for all three of the data files being loaded, each in its own unique collection name. Final note: MongoDB is highly case sensitive, so make sure these commands are copied exactly.

mongoimport --db PopulationData --collection populationchange --type csv --headerline --stopOnError --ignoreBlanks -file countypopulationchange.csv

mongoimport --db PopulationData --collection laborforce2000 --type csv --headerline --stopOnError --ignoreBlanks -file  laborforcedata2000.csv

mongoimport --db PopulationData --collection laborforce2010 --type csv --headerline --stopOnError --ignoreBlanks -file  laborforcedata2010.csv

8) To check to see what you're new collection and documents look like, we will log back into the MongoDB shell with the "mongo" command. Then "use PopulationData" to go back into the database that you created earlier. Here are some simple commands used to query your database and collections.show 

"show collections" - will show a list of all collections in the database.

"db.populationchange.findOne()" - shows one random document from the population change collection that we created 

Using Python to Run Analysis on U.S. Census Data and Labor Force Data:

1) First we need to install the required packages

      $ sudo apt-get install python-pip
      
      $ sudo pip install pymongo
      
2) Make sure that a connection is open to your MongoDB

$ mongod --dbpath=/home/username/data/db

3) In a second terminal, save the PythonScript.py file anywhere in your directory and run this command:

$ python PythonScript.py

You should see a message that says "Connected successfully!" You should also see a new file in your directory titled "rate2000". The program looks for all of the unemployment rates that are above 10 and returns them in a csv document. Here is a sample of what the script looks like:

4) The csv file can now be used for easy visualization. Congratulations, you are finished!

Part B - Futuresystems Ubuntu

Required Manual Software Installation:

1. Login to india.futuresystems.org using Putty

2.  $ sudo apt-get install python-pip

3. $ module load openstack

4. $ virtualenv $HOME/bdossp-sp16

   $ source $HOME/bdossp-sp16/bin/activate
   
5. $ pip install --trusted-host pypi.python.org ansible

6. $ git clone https://github.iu.edu/edenbarn/sw-project-template.git

7. $ cd /sw-project-template/src/playbook-codes

Edit the inventory.txt file with the IP address of your VM instance.

   $ ansible-playbook -i inventory.txt -c ssh hadoop-install.yml
   
8. $ ansible-playbook -i inventory.txt -c ssh mongo-install.yml

9. Go to home directory and become root user

    $ mkdir -p /data/db
    
    $ mongod --dbpath=/data/db
    
10. Open a new terminal and then run: $ mongo

    $ use PopulationData
     
    $ exit
     
11. $ cd sw-project-template/data

    $ cp countypopulationchange.csv ~/PopulationData
      
    $ cp laborforcedata2010.csv ~/PopulationData
      
    $ cp laborforcedata2000.csv ~/PopulationData
      
12. $ python PythonScript.py


References
https://www.youtube.com/watch?v=_qLTMpdP7H4 (Easiest way to install / setup hadoop | Hadoop tutorial)

https://www.youtube.com/watch?v=lrFWHIadwhQ (How to Install MongoDB in Ubuntu | Kalyan Hadoop Training in Hyderabad) 

http://www.thegeekstuff.com/2012/02/hadoop-standalone-installation/ (Apache Hadoop Single Node Standalone Installation Tutorial)

https://masteringmean.com/lessons/627-Integration-of-MongoDB-and-Hadoop (Installation of MongoDB-Hadoop connector)

https://mongodb-documentation.readthedocs.org/en/latest/ecosystem/tutorial/getting-started-with-hadoop.html

https://api.mongodb.org/python/current/tutorial.html

https://www.youtube.com/watch?v=Df2Odze87dE (Map Reduce Word Count Program using Java)

https://github.com/futuresystems/ansible-role-hadoop_install (Hadoop installation using Ansible playbook)

http://bdossp-spring2016.readthedocs.io/en/latest/lesson/devops/ansible.html & https://github.com/cglmoocs/BDOSSSpring2016/blob/master/docs/source/lesson/ansible_roles.rst (MongoDB installation using Ansible roles)

https://github.com/mongodb/mongo-hadoop/wiki/Sensor-Logs-Example (Sensor logs example for MongoDB-Hadoop connector)
