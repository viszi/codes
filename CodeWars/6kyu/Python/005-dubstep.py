# https://www.codewars.com/kata/551dc350bf4e526099000ae5
# Polycarpus works as a DJ in the best Berland nightclub, and he often uses dubstep music in his performance. Recently, he has decided to take a couple of old songs and make dubstep remixes from them.
# Let's assume that a song consists of some number of words (that don't contain WUB). To make the dubstep remix of this song, Polycarpus inserts a certain number of words "WUB" before the first word of the song (the number may be zero), after the last word (the number may be zero), and between words (at least one between any pair of neighbouring words), and then the boy glues together all the words, including "WUB", in one string and plays the song at the club.
# For example, a song with words "I AM X" can transform into a dubstep remix as "WUBWUBIWUBAMWUBWUBX" and cannot transform into "WUBWUBIAMWUBX".

def song_decoder(song):
    s = song.split('WUB')
    
    result = ''
    for word in s:
        if word != '':
            result += word + ' '
    return result[:-1]

print(song_decoder("AWUBBWUBC"), "A B C","WUB should be replaced by 1 space")
print(song_decoder("AWUBWUBWUBBWUBWUBWUBC"), "A B C","multiples WUB should be replaced by only 1 space")
print(song_decoder("WUBAWUBBWUBCWUB"), "A B C","heading or trailing spaces should be removed")