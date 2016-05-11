var fs = require('fs');

var obj = {"classes": {
  "bard": [],
  "cleric": [],
  "druid": [],
  "paladin": [],
  "ranger": [],
  "sorceror": [],
  "warlock": [],
  "wizard": []
}};

var rawObj = {
  "bard": "Dancing Lights,Light,Mage Hand,Mending,Message,Minor Illusion,Prestidigitation,True Strike,Bane,Charm Person,Comprehend Languages,Cure Wounds,Detect Magic,Disguise Self,Faerie Fire,Feather Fall,Healing Word,Heroism,Hideous Laughter,Identify,Illusory Script,Longstrider,Silent Image,Sleep,Speak with Animals,Thunderwave,Unseen Servant,Animal Messenger,Calm Emotions,Detect Thoughts,Enhance Ability,Enthrall,Heat Metal,Hold Person,Invisibility,Knock,Lesser Restoration,Locate Animals or Plants,Locate Object,Magic Mouth,See Invisibility,Shatter Silence,Suggestion,Zone of Truth,Bestow Curse,Clairvoyance,Dispel Magic,Fear,Glyph of Warding,Hypnotic Pattern,Major Image,Nondetection,Plant Growth,Sending,Speak with Dead,Speak with Plants,Stinking Cloud,Tiny Hut,Tongues,Confusion,Dimension Door,Freedom of Movement,Greater Invisibility,Hallucinatory Terrain,Locate Creature,Polymorph,Animate Objects,Awaken,Dominate Person,Dream,Geas,Greater Restoration,Hold Monster,Legend Lore,Mass Cure Wounds,Mislead,Modify Memory,Planar Binding,Raise Dead,Scrying,Seeming,Teleportation Circle,Eyebite,Find the Path,Guards and Wards,Irresistible Dance,Mass Suggestion,Programmed Illusion,True Seeing,Arcane Sword,Etherealness,Forcecage,Magnificent Mansion,Mirage Arcane,Project Image,Regenerate,Resurrection,Symbol,Teleport,Dominate Monster,Feeblemind,Glibness,Mind Blank,Power Word Stun,Foresight,Power Word Kill,True Polymorph",
  "cleric": "Guidance,Light,Mending,Resistance,Sacred Flame,Spare the Dying,Thaumaturgy,Bane,Bless,Command,Create or Destroy Water,Cure Wounds,Detect Evil and Good,Detect Magic,Detect Poison and Disease,Guiding Bolt,Healing Word,Inflict Wounds,Protection from Evil and Good,Purify Food and Drink,Sanctuary,Shield of Faith,Aid,Augury,Blindness/Deafness,Calm Emotions,Continual Flame,Enhance Ability,Find Traps,Gentle Repose,Hold Person,Lesser Restoration,Locate Object,Prayer of Healing,Protection from Poison,Silence,Spiritual Weapon,Warding Bond,Zone of Truth,Animate Dead,Beacon of Hope,Bestow Curse,Clairvoyance,Create Food and Water,Daylight,Dispel Magic,Feign Death,Glyph of Warding,Magic Circle,Mass Healing Word,Meld Into Stone,Protection from Energy,Remove Curse,Revivify,Sending,Speak with Dead,Spirit Guardians,Tongues,Water Walk,Banishment,Control Water,Death Ward,Divination,Freedom of Movement,Guardian of Faith,Locate Creature,Stone Shape,Commune,Contagion,Dispel Evil and Good,Flame Strike,Geas,Greater Restoration,Hallow,Insect Plague,Legend Lore,Mass Cure Wounds,Planar Binding,Raise Dead,Scrying,Blade Barrier,Create Undead,Find the Path,Forbiddance,Harm,Heal,Heroes' Feast,Planar Ally,True Seeing,Word of Recall,Conjure Celestial,Divine Word,Etherealness,Fire Storm,Plane Shift,Regenerate,Resurrection,Symbol,Antimagic Field,Control Weather,Earthquake,Holy Aura,Astral Projection,Gate,Mass Heal,True Resurrection",
  "druid": "Control Flames,Create Bonfire,Druidcraft,Frostbite,Guidance,Gust,Magic Stone,Mending,Mold Earth,Poison Spray,Produce Flame,Resistance,Shape Water,Shillelagh,Thorn Whip,Thunderclap,Absorb Elements,Animal Friendship,Beast Bond,Charm Person,Create or Destroy Water,Cure Wounds,Detect Magic,Detect Poison and Disease,Earth Tremor,Entangle,Faerie Fire,Fog Cloud,Goodberry,Healing Word,Ice Knife,Jump,Longstrider,Purify Food and Drink,Speak with Animals,Thunderwave,Animal Messenger,Barkskin,Beast Sense,Darkvision,Dust Devil,Earthbind,Enhance Ability,Find Traps,Flame Blade,Flaming Sphere,Gust of Wind,Heat Metal,Hold Person,Lesser Restoration,Locate Animals or Plants,Locate Object,Moonbeam,Pass Without Trace,Protection from Poison,Skywrite,Spike Growth,Warding Wind,Call Lightning,Conjure Animals,Daylight,Dispel Magic,Erupting Earth,Feign Death,Flame Arrows,Meld Into Stone,Plant Growth,Protection from Energy,Sleet Storm,Speak with Plants,Tidal Wave,Wall of Water,Water Breathing,Water Walk,Wind Wall,Blight,Confusion,Conjure Minor Elementals,Conjure Woodland Beings,Control Water,Dominate Beast,Elemental Bane,Freedom of Movement,Giant Insect,Grasping Vine,Hallucinatory Terrain,Ice Storm,Locate Creature,Polymorph,Stone Shape,Stoneskin,Wall of Fire,Watery Sphere,Antilife Shell,Awaken,Commune with Nature,Conjure Elemental,Contagion,Control Winds,Geas,Greater Restoration,Insect Plague,Maelstrom,Mass Cure Wounds,Planar Binding,Reincarnate,Scrying,Transmute Rock,Tree Stride,Wall of Stone,Antilife Shell,Bones of the Earth,Conjure Fey,Find the Path,Heal,Heroes' Feast,Investiture of Flame,Investiture of Ice,Investiture of Stone,Investiture of Wind,Move Earth,Primordial Ward,Sunbeam,Transport via Plants,Wall of Thorns,Wind Walk,Fire Storm,Mirage Arcane,Plane Shift,Regenerate,Resurrection,Reverse Gravity,Whirlwind,Animal Shapes,Antipathy/Sympathy,Control Weather,Earthquake,Feeblemind,Sunburst,Tsunami,Foresight,Shapechange,Storm of Vengeance,True Resurrection",
  "paladin": "Bless,Command,Compelled Duel,Cure Wounds,Detect Evil and Good,Detect Magic,Detect Poison and Disease,Divine Favor,Heroism,Protection from Evil and Good,Purify Food and Drink,Searing Smite,Shield of Faith,Thunderous Smite,Wrathful Smite,Aid,Branding Smite,Find Steed,Lesser Restoration,Locate Object,Magic Weapon,Protection from Poison,Zone of Truth,Aura Of Vitality,Blinding Smite,Create Food and Water,Crusader's Mantle,Daylight,Dispel Magic,Elemental Weapon,Magic Circle,Remove Curse,Revivify,Aura of Life,Aura of Purity,Banishment,Death Ward,Locate Creature,Staggering Smite,Banishing Smite,Circle of Power,Destructive Wave,Dispel Evil and Good,Geas,Raise Dead",
  "ranger": "Absorb Elements,Alarm,Animal Friendship,Beast Bond,Cure Wounds,Detect Magic,Detect Poison and Disease,Ensnaring Strike,Fog Cloud,Goodberry,Hail of Thorns,Hunter's Mark,Jump,Longstrider,Speak with Animals,Animal Messenger,Barkskin,Beast Sense,Cordon Of Arrows,Darkvision,Find Traps,Lesser Restoration,Locate Animals or Plants,Locate Object,Pass Without Trace,Protection from Poison,Silence,Spike Growth,Conjure Animals,Conjure Barrage,Daylight,Flame Arrows,Lightning Arrow,Nondetection,Plant Growth,Protection from Energy,Speak with Plants,Water Breathing,Water Walk,Wind Wall,Conjure Woodland Beings,Freedom of Movement,Grasping Vine,Locate Creature,Stoneskin,Commune with Nature,Conjure Volley,Swift Quiver,Tree Stride",
  "sorceror": "Acid Splash,Blade Ward,Booming Blade,Chill Touch,Control Flames,Create Bonfire,Dancing Lights,Fire Bolt,Friends,Frostbite,Green-Flame Blade,Gust,Light,Lightning Lure,Mage Hand,Mending,Message,Minor Illusion,Mold Earth,Poison Spray,Prestidigitation,Ray of Frost,Shape Water,Shocking Grasp,Sword Burst,Thunderclap,True Strike,Burning Hands,Catapult,Charm Person,Chromatic Orb,Color Spray,Comprehend Languages,Detect Magic,Disguise Self,Earth Tremor,Expeditious Retreat,False Life,Feather Fall,Fog Cloud,Ice Knife,Jump,Mage Armor,Magic Missile,Ray of Sickness,Shield,Silent Image,Sleep,Thunderwave,Witch Bolt,Aganazzar's Scorcher,Alter Self,Blindness/Deafness,Blur,Cloud of Daggers,Crown of Madness,Darkness,Darkvision,Detect Thoughts,Dust Devil,Earthbind,Enhance Ability,Enlarge/Reduce,Gust of Wind,Hold Person,Invisibility,Knock,Levitate,Maximilian's Earthen Grasp,Mirror Image,Misty Step,Phantasmal Force,Pyrotechnics,Scorching Ray,See Invisibility,Shatter,Snilloc's Snowball Swarm,Spider Climb,Suggestion,Warding Wind,Web,Blink,Clairvoyance,Counterspell,Daylight,Dispel Magic,Erupting Earth,Fear,Fireball,Flame Arrows,Fly,Gaseous Form,Haste,Hypnotic Pattern,Lightning Bolt,Major Image,Melf's Minute Meteors,Protection from Energy,Sleet Storm,Slow,Stinking Cloud,Tongues,Wall of Water,Water Breathing,Water Walk,Banishment,Blight,Confusion,Dimension Door,Dominate Beast,Greater Invisibility,Ice Storm,Polymorph,Stoneskin,Storm Sphere,Vitriolic Sphere,Wall of Fire,Watery Sphere,Animate Objects,Cloudkill,Cone of Cold,Control Winds,Creation,Dominate Person,Hold Monster,Immolation,Insect Plague,Seeming,Telekinesis,Teleportation Circle,Wall of Stone,Arcane Gate,Chain Lightning,Circle of Death,Disintegrate,Eyebite,Globe of Invulnerability,Investiture of Flame,Investiture of Ice,Investiture of Stone,Investiture of Wind,Mass Suggestion,Move Earth,Sunbeam,True Seeing,Delayed Blast Fireball,Etherealness,Finger of Death,Fire Storm,Plane Shift,Prismatic Spray,Reverse Gravity,Teleport,Abi Dalzim's Horrid Wilting,Dominate Monster,Earthquake,Incendiary Cloud,Power Word Stun,Sunburst,Gate,Meteor Swarm,Power Word Kill,Time Stop,Wish",
  "warlock": "Blade Ward,Booming Blade,Chill Touch,Create Bonfire,Eldritch Blast,Friends,Frostbite,Green-Flame Blade,Lightning Lure,Mage Hand,Magic Stone,Minor Illusion,Poison Spray,Prestidigitation,Sword Burst,Thunderclap,True Strike,Armor of Agathys,Arms of Hadar,Charm Person,Comprehend Languages,Expeditious Retreat,Hellish Rebuke,Hex,Illusory Script,Protection from Evil and Good,Unseen Servant,Witch Bolt,Cloud of Daggers,Crown of Madness,Darkness,Earthbind,Enthrall,Hold Person,Invisibility,Mirror Image,Misty Step,Ray of Enfeeblement,Shatter,Spider Climb,Suggestion,Counterspell,Dispel Magic,Fear,Fly,Gaseous Form,Hunger of Hadar,Hypnotic Pattern,Magic Circle,Major Image,Remove Curse,Tongues,Vampiric Touch,Banishment,Blight,Dimension Door,Elemental Bane,Hallucinatory Terrain,Contact Other Plane,Dream,Hold Monster,Scrying,Arcane Gate,Circle of Death,Conjure Fey,Create Undead,Eyebite,Flesh to Stone,Investiture of Flame,Investiture of Ice,Investiture of Stone,Investiture of Wind,Mass Suggestion,True Seeing,Etherealness,Finger of Death,Forcecage,Plane Shift,Demiplane,Dominate Monster,Feeblemind,Glibness,Power Word Stun,Astral Projection,Foresight,Imprisonment,Power Word Kill,True Polymorph",
  "wizard": "Acid Splash,Blade Ward,Booming Blade,Chill Touch,Control Flames,Create Bonfire,Dancing Lights,Fire Bolt,Friends,Frostbite,Green-Flame Blade,Gust,Light,Lightning Lure,Mage Hand,Mending,Message,Minor Illusion,Mold Earth,Poison Spray,Prestidigitation,Ray of Frost,Shape Water,Shocking Grasp,Sword Burst,Thunderclap,True Strike,Absorb Elements,Alarm,Burning Hands,Catapult,Charm Person,Chromatic Orb,Color Spray,Comprehend Languages,Detect Magic,Disguise Self,Earth Tremor,Expeditious Retreat,False Life,Feather Fall,Find Familiar,Fog Cloud,Grease,Ice Knife,Identify,Illusory Script,Jump,Longstrider,Mage Armor,Magic Missile,Protection from Evil and Good,Ray of Sickness,Shield,Silent Image,Sleep,Tasha's Hideous Laughter,Tenser's Floating Disk,Thunderwave,Unseen Servant,Witch Bolt,Aganazzar's Scorcher,Alter Self,Arcane Lock,Blindness/Deafness,Blur,Cloud of Daggers,Continual Flame,Crown of Madness,Darkness,Darkvision,Detect Thoughts,Dust Devil,Earthbind,Enlarge/Reduce,Flaming Sphere,Gentle Repose,Gust of Wind,Hold Person,Invisibility,Knock,Levitate,Locate Object,Magic Mouth,Magic Weapon,Maximilian's Earthen Grasp,Melf's Acid Arrow,Mirror Image,Misty Step,Nystul's Magic Aura,Phantasmal Force,Pyrotechnics,Ray of Enfeeblement,Rope Trick,Scorching Ray,See Invisibility,Shatter,Skywrite,Snilloc's Snowball Swarm,Spider Climb,Suggestion,Web,Animate Dead,Bestow Curse,Blink,Clairvoyance,Counterspell,Dispel Magic,Erupting Earth,Fear,Feign Death,Fireball,Flame Arrows,Fly,Gaseous Form,Glyph of Warding,Haste,Hypnotic Pattern,Leomund's Tiny Hut,Lightning Bolt,Magic Circle,Major Image,Melf's Minute Meteors,Nondetection,Phantom Steed,Protection from Energy,Remove Curse,Sending,Sleet Storm,Slow,Stinking Cloud,Tidal Wave,Tongues,Vampiric Touch,Wall of Sand,Wall of Water,Water Breathing,Arcane Eye,Banishment,Blight,Confusion,Conjure Minor Elementals,Control Water,Dimension Door,Elemental Bane,Evard's Black Tentacles,Fabricate,Fire Shield,Greater Invisibility,Hallucinatory Terrain,Ice Storm,Leomund's Secret Chest,Locate Creature,Mordenkainen's Faithful Hound,Mordenkainen's Private Sanctum,Otiluke's Resilient Sphere,Phantasmal Killer,Polymorph,Stone Shape,Stoneskin,Storm Sphere,Vitriolic Sphere,Wall of Fire,Watery Sphere,Animate Objects,Bigby's Hand,Cloudkill,Cone of Cold,Conjure Elemental,Contact Other Plane,Control Winds,Creation,Dominate Person,Dream,Geas,Hold Monster,Immolation,Legend Lore,Mislead,Modify Memory,Passwall,Planar Binding,Rary's Telepathic Bond,Scrying,Seeming,Telekinesis,Teleportation Circle,Transmute Rock,Wall of Force,Wall of Stone,Arcane Gate,Chain Lightning,Circle of Death,Contingency,Create Undead,Disintegrate,Drawmij's Instant Summons,Eyebite,Flesh to Stone,Globe of Invulnerability,Guards and Wards,Investiture of Flame,Investiture of Ice,Investiture of Stone,Investiture of Wind,Magic Jar,Mass Suggestion,Move Earth,Otiluke's Freezing Sphere,Otto's Irresistible Dance,Programmed Illusion,Sunbeam,True Seeing,Wall of Ice,Delayed Blast Fireball,Etherealness,Finger of Death,Forcecage,Mirage Arcane,Mordenkainen's Magnificent Mansion,Mordenkainen's Sword,Plane Shift,Prismatic Spray,Project Image,Reverse Gravity,Sequester,Simulacrum,Symbol,Teleport,Whirlwind,Abi Dalzim's Horrid Wilting,Antimagic Field,Antipathy/Sympathy,Clone,Control Weather,Demiplane,Dominate Monster,Feeblemind,Incendiary Cloud,Maze,Mind Blank,Power Word Stun,Sunburst,Telepathy,Astral Projection,Foresight,Gate,Imprisonment,Meteor Swarm,Power Word Kill,Prismatic Wall,Shapechange,Time Stop,True Polymorph,Weird,Wish"
};


var addToObj = function(raw, whichClass) {
  newArray = raw.split(',');
  obj.classes[whichClass] = newArray;
}

for (var key in rawObj) {
  addToObj(rawObj[key], key)
}

var finalObj = JSON.stringify(obj);


// fs.writeFile("betterSpells.json", finalObj, function(err){
//   console.log("FILE WRITEN!");
// })

obj.foo = ["apples", "pie"];
console.log(obj.foo);
