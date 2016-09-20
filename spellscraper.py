import json
import urllib
import pandas as pd
import numpy as np
import requests
import json
import re
import matplotlib.pyplot as plt
from bs4 import BeautifulSoup
%matplotlib inline

# Site to use: https://www.dnd-spells.com/spells
# spell site syntax: https://www.dnd-spells.com/spell/zone-of-truth

# GET ALL THE SPELL SITES TO SCRAP
#define site to use
url = 'https://www.dnd-spells.com/spells'
#get content of main page
resp = requests.get(url)
#put this into beautiful soup format
soup = BeautifulSoup(resp.text)
#get just the content of the spells
info = soup.table
#pull all the links from the spell table
spells = info.find_all('a')
#make a list of all the unique links from spells (they're listed twice because of 'open in new window')
spell_links = []
for item in spells:
    link = item.get('href')
    if link not in spell_links:
        spell_links.append(link)

# CREATE LISTS OF RELEVANT FEATURES
title = []
school = []
level = []
casting_time = []
spell_range = []
components = []
duration = []
description = []
source = []
spell_classes = []
higher_class = []

attributes = [title,school,level,casting_time,spell_range,components,duration,description,source,spell_classes,higher_class]


# ITERATE THROUGH THE PAGES GETTING INFORMATION
for link in spell_links:
    print link
    try:
        content = requests.get(link)
        spell_info =  BeautifulSoup(content.text)

        head = spell_info.find_all('h1')
        for item in head:
            title.append(item.find('span').find(text=True))

        body = spell_info.findAll('p')

        school.append(body[1].find(text=True))

        fine_details = body[2].find_all('strong')
        level.append(fine_details[0].find(text=True))
        casting_time.append(fine_details[1].find(text=True))
        spell_range.append(fine_details[2].find(text=True))
        components.append(fine_details[3].find(text=True).split(', '))
        duration.append(fine_details[4].find(text=True))

        description.append(body[3])

        if 'Page' in body[4].find(text=True):
            # source.append(re.findall(r'[^\n\s].*[^(\s{3,})]', body[4].find(text=True))[0])
            sourcenum = 4
            classesnum = 5
            higher_class.append('n/a')
        else:
            sourcenum = 5
            classesnum = 6
            higher_class.append(body[4])

        source.append(re.findall(r'[^\n\s].*[^(\s{3,})]', body[sourcenum].find(text=True))[0])

        messyclasses = body[classesnum].find_all('a')
        classes = []
        for item in messyclasses:
            classes.append(re.findall(r'[^/]*?$', item.get('href'))[0])
        spell_classes.append(classes)
    except:
        print 'error'

#CREATE DATAFRAME
index = ['title','school','level','casting_time','spell_range','components','duration','description','source','spell_classes','higher_class']
spells_df = pd.DataFrame(attributes, index=index)

spells_df

spells_df.rename(index={'spell_range':'range'}, inplace=True)

spells_df.to_csv('spells.csv', encoding='utf-8')

spellsforjson = pd.read_csv('spells.csv')
spellsforjson.to_json('spells.json')

#errors on: glyph-of-warding, trap-the-soul
