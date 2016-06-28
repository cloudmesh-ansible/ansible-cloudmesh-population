import csv 
import pandas as pd
import numpy as np

#Import Geography File and transform
GeoFile = pd.read_csv('/src/groupproject_bdossp/CensusZipGeoFile.csv', header=None, usecols=[0,1,2,3,8])
GeoFile.drop(GeoFile.head(1).index, inplace=True)
GeoFile.columns = ['FID', 'ZCTA5CE10', 'AFFGEOID10', 'GEOID10', 'LandSqMi']

#Import ACS File and transform
ACSFile = pd.read_csv('/src/groupproject_bdossp/ACS_11_5YR_S2301_with_ann.csv', header=None, usecols=[0,3,9,4,16,24,32,40,48])
ACSFile.drop(ACSFile.head(2).index, inplace=True) 
ACSFile.columns = ['AFFGEOID10', 'Total_2011_ACS_WORKINGAGE', 'UNEMPLOY_2011_ACS_5_YEAR',"Population","HC04_EST_VC03","HC04_EST_VC04","HC04_EST_VC05","HC04_EST_VC06","HC04_EST_VC07"]

#Import XY File and transform
XYFile = pd.read_csv('/src/groupproject_bdossp/XY.csv', header=None, usecols=[0,1,2,3])
XYFile.drop(ACSFile.head(1).index, inplace=True) 
XYFile.columns = ['AFFGEOID10', 'X', 'Y', 'STATE']

#Import Decinnial File and transform
DeciFile = pd.read_csv('/src/groupproject_bdossp/DEC_00_SF3_DP3_with_ann.csv', header=None, usecols=[0,2,3,12])
DeciFile.drop(DeciFile.head(2).index, inplace=True) 
DeciFile.columns = ['AFFGEOID10', 'Geography', 'Total_2000_WORKINGAGE', 'UNEMPLOY_2000_DECI']

#join files based on AFFGEOID10 field
merge1=GeoFile.merge(ACSFile, how='outer', on='AFFGEOID10')
merge11=merge1.merge(XYFile, how='outer', on='AFFGEOID10')
merge2=merge11.merge(DeciFile, how='outer', on='AFFGEOID10')

#erase null and zero data lines
merge2=merge2[merge2.UNEMPLOY_2000_DECI.notnull()]
merge2=merge2[merge2.UNEMPLOY_2000_DECI !='(X)']
merge2=merge2[merge2.UNEMPLOY_2011_ACS_5_YEAR.notnull()]
merge2=merge2[merge2.UNEMPLOY_2011_ACS_5_YEAR !='-']
merge2=merge2[merge2.Population.notnull()]
merge2=merge2[merge2.Population !=0]
merge2=merge2[merge2.HC04_EST_VC03.notnull()]
merge2=merge2[merge2.HC04_EST_VC03 !=0]
merge2=merge2[merge2.HC04_EST_VC03 !='**']
merge2=merge2[merge2.HC04_EST_VC04.notnull()]
merge2=merge2[merge2.HC04_EST_VC04 !=0]
merge2=merge2[merge2.HC04_EST_VC04 !='**']
merge2=merge2[merge2.HC04_EST_VC05.notnull()]
merge2=merge2[merge2.HC04_EST_VC05 !=0]
merge2=merge2[merge2.HC04_EST_VC05 !='**']
merge2=merge2[merge2.HC04_EST_VC06.notnull()]
merge2=merge2[merge2.HC04_EST_VC06 !=0]
merge2=merge2[merge2.HC04_EST_VC06 !='**']
merge2=merge2[merge2.HC04_EST_VC07.notnull()]
merge2=merge2[merge2.HC04_EST_VC07 !=0]
merge2=merge2[merge2.HC04_EST_VC07 !='**']
merge2=merge2[merge2.Total_2011_ACS_WORKINGAGE.notnull()]
merge2=merge2[merge2.Total_2011_ACS_WORKINGAGE !=0]
merge2=merge2[merge2.Total_2000_WORKINGAGE.notnull()]
merge2=merge2[merge2.Total_2000_WORKINGAGE !=0]
merge2=merge2[merge2.Geography.notnull()]
merge2=merge2[merge2.X.notnull()]
merge2=merge2[merge2.Y.notnull()]

#transform strings to floats
merge2['Total_2000_WORKINGAGE'] = merge2['Total_2000_WORKINGAGE'].astype(float)
merge2['Total_2011_ACS_WORKINGAGE'] = merge2['Total_2011_ACS_WORKINGAGE'].astype(float)
merge2['LandSqMi'] = merge2['LandSqMi'].astype(float)
merge2['UNEMPLOY_2000_DECI'] = merge2['UNEMPLOY_2000_DECI'].astype(float)
merge2['UNEMPLOY_2011_ACS_5_YEAR'] = merge2['UNEMPLOY_2011_ACS_5_YEAR'].astype(float)
merge2['FID'] = merge2['FID'].astype(float)

#confirm other fields are stirings
merge2['ZCTA5CE10'] = merge2['ZCTA5CE10'].astype(str)
merge2['AFFGEOID10'] = merge2['AFFGEOID10'].astype(str)
merge2['GEOID10'] = merge2['GEOID10'].astype(str)
merge2['Geography'] = merge2['Geography'].astype(str)

#create density totals
merge2['DENSITY_2000']=merge2.Total_2000_WORKINGAGE/merge2.LandSqMi
merge2['DENSITY_2011']=merge2.Total_2011_ACS_WORKINGAGE/merge2.LandSqMi
merge2['DENSITY_CHANGE']=((merge2.Total_2011_ACS_WORKINGAGE/merge2.LandSqMi)-(merge2.Total_2000_WORKINGAGE/merge2.LandSqMi))/merge2.Total_2000_WORKINGAGE/merge2.LandSqMi

CombinedFile= [merge2]

#export to csv and json files

merge2.to_csv('test.csv', float_format = '%.10f')
merge2.to_json('test.json')       
