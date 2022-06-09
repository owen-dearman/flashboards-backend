INSERT INTO users (username) VALUES 
('owen-dearman'),
('eralia!');

INSERT INTO words (user_id, word, phonetics, freq, syllables, audio, url) VALUES
(55555, 'defenestration', '/dɪˌfɛnɪˈstɹeɪʃ(ə)n/', 0.035980, 5, 'https://api.dictionaryapi.dev/media/pronunciations/en/defenestration-uk.mp3', 'https://en.wiktionary.org/wiki/defenestration'),
(55555, 'ubiquitous', null, 5.342419, 4, 'https://api.dictionaryapi.dev/media/pronunciations/en/ubiquitous-au.mp3', 'https://en.wiktionary.org/wiki/ubiquitous'),
(55556, 'serendipity', '/ˌsɛ.ɹən.ˈdɪ.pɪ.ti/', 0.573256, 5, 'https://api.dictionaryapi.dev/media/pronunciations/en/serendipity-au.mp3', 'https://en.wiktionary.org/wiki/serendipity'),
(55555, 'bayou', '/ˈbaɪ.oʊ/', 1.317743, 2, null, 'https://en.wiktionary.org/wiki/bayou');


INSERT INTO meanings (word_id, meaning, pos) VALUES 
(1, 'The act of throwing something or someone out of a window', 'noun'),
(1, 'The high-profile removal of a person from an organization.', 'noun'),
(1, 'The act of removing the Microsoft Windows operating system from a computer in order to install an alternative one.', 'noun'),
(2, 'Being everywhere at once: omnipresent.', 'adjective'),
(2, 'Appearing to be everywhere at once; being or seeming to be in more than one location at the same time.', 'adjective'),
(2, 'Widespread; very prevalent.', 'adjective'),
(3, 'A combination of events which have come together by chance to make a surprisingly good or wonderful outcome.', 'noun'),
(3, 'An unsought, unintended, and/or unexpected, but fortunate, discovery and/or learning experience that happens by accident.', 'noun'),
(4, 'A slow-moving, often stagnant creek or river.', 'noun'),
(4, 'A swamp, a marshy (stagnant) body of water.', 'noun');


INSERT INTO synonyms (word_id, word) VALUES 
(1, 'eviscertaion'),
(1, 'regicide'),
(1, 'decapitation'),
(1, 'capitulation'),
(1, 'seppuku'),
(2, 'omnipresent'),
(2, 'present'),
(2, 'pervasive'),
(2, 'prevalent'),
(2, 'everywhere'),
(3, 'randomness'),
(3, 'coincidence'),
(3, 'accident'),
(3, 'chance'),
(3, 'happenstance'),
(4, 'marsh'),
(4, 'swamp'),
(4, 'wetland'),
(4, 'south'),
(4, 'bog');






