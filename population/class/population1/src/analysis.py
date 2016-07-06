import sys
import csv
from pymongo import MongoClient

try:
	client=MongoClient('localhost',27017)
	print "Connected successfully!"
except:
	print "Could not connect to MongoDB"

db=client.PopulationData
collection=db.laborforce2000

cursor=collection.find({"Unemployment Rate (%)":{"$gt":10}})
with open('rate2000','w') as outfile:
	fields=['_id','Concat1','Concat2','ConcatFIPS','LAUS Code','State FIPS Code','County FIPS Code','County/State','Year','Labor Force','Employed','Unemployed','Unemployment Rate (%)']
	writer=csv.DictWriter(outfile,fieldnames=fields)
	writer.writeheader()
	for x in cursor:
		writer.writerow(x)

