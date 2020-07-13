#!/usr/bin/env python3
#######################################################
# Ex: python yourvote.py Questions.txt --vote XXXXXX  #
# Input: Questions.txt: Open .pdf and save as .txt    #
#        XXXXXX: your StudentId                       #
# Output: XXXXXX.csv                                  #
#######################################################
import csv, argparse, re

class Quest:
    def __init__(self, filePath):
        self.filePath = filePath
        all = self.readText(filePath)
        self.questions, self.assigment = self.separate(all)

    def readText(self, filePath):
        try:
            with open(filePath, newline='',mode='r', encoding='utf-8-sig',errors='replace') as f:
                return self.clean(f.readlines())
        except Exception as e:
            print(f' Error reading file: {e}')

    # remove blank and --- start line
    def clean(self, lines):
        return list(filter(lambda line: not ( (line.startswith('---') or line.startswith("\r") or line=='') ) , lines))

    # merge multiline
    def fixMultilineQuest(self, lst):
        i = j = 0
        while i<len(lst):
            if lst[i].startswith('Correct Answer') or re.match(r"\s*\d", lst[i]):
                j = i
            else:
                lst[j] = lst[j].rstrip() + '\n' + lst[i]
                lst[i] = ''
            i += 1
        return self.clean(lst)
    
    # map assigment in to dict of student
    def processAsgn(self, lst):
        ret = {}
        i=1
        while i<len(lst)-1:
            studentId = re.match(r"StudentId : (\d*)", lst[i])
            studentId = studentId.group(1)
            qLst = lst[i+1].split(',')
            qLst = list(map(lambda x: x.strip(' []\r'), qLst))
            qLst = list(map(lambda x: int(x) if x.isdigit() else 0, qLst))
            # printList(qLst)
            ret[studentId] = qLst
            i += 2
        return ret

    # separate question and assigment then processing
    def separate(self, lst):
        separated_at = lst.index("Assignments \r")
        return self.fixMultilineQuest(lst[0:separated_at+1]), self.processAsgn(lst[separated_at:])

    def countQuestion(self, lst):
        return len(list(filter(lambda x: re.match('Correct Answer.*', x), lst)))

    def getQuestion(self, idx):
        return self.questions[idx*6:idx*6+6]

    def getAssigment(self, stuid):
        return self.assigment[stuid]

    # vote action
    def doVote(self, stuid):
        self.votes = []
        # printList(self.assigment[stuid])
        for i in self.assigment[stuid]:
            print('===================================================================================')
            printList(self.getQuestion(i-1))
            v = inputVote(i)
            if v == 'q':
                return []
            else:
                self.votes.append(v)
        return self.votes

    # TODO: practice action
    def practice(self, noofq=49):
        return self.questions

def voteToCSV(votes, filename):
    try:
        with open(filename+'.csv', mode='w', newline='') as vote_file:
            vote_wr = csv.writer(vote_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            for v in votes:
                vote_wr.writerow(v)
        print('Exported CSV votes to: ' + filename+'.csv')
    except Exception as e:
        print(f' Error write file: {e}')
        print('retry with: '+filename+'_')
        voteToCSV(votes, filename+'_')
    
def inputVote(qid):
    print('===================================================================================')
    v = input('Vote 0-5 (q to quit): ')
    if v.isdigit():
        v = int(v)
        if v in range(0,6):
            return [qid, v]
    elif v == 'q':
        return v
    return inputVote(qid)
        

def printList(lst):
    for s in lst: 
        print(s)

def printListasCSV(lst):
    for s in lst: 
        s = list(map(lambda x: str(x), s))
        print(','.join(s))


# main
parser = argparse.ArgumentParser()
parser.add_argument("filePath", help="path to Question.txt file, -h to help ")
parser.add_argument("--quest", metavar='questionId', help="Question by id ")
parser.add_argument("--vote", metavar='studentId', help="Student id to Vote")

Q = Quest(parser.parse_args().filePath)

if parser.parse_args().quest != None:
    uid = (parser.parse_args().quest)
    print(Q.assigment[uid])

# printList(Q.getQuestion(0))
# stuid = input('Student Id')
if parser.parse_args().vote != None:
    uid = (parser.parse_args().vote)
    if Q.assigment.get(uid) !=None:
        print('List questions need your vote: ['+ ', '.join(map(lambda x: str(x), Q.assigment[uid])) + ']' )
        
        if len(Q.assigment[uid])> 0 :
            votes = Q.doVote(uid)
            if (len(votes)>0):
                printListasCSV(votes)
                voteToCSV(votes, uid)
        else:
            print('Your vote questions is empty, please check and maybe you must do manually')
    else:
        print('Sorry, Student id not found. Recheck again and maybe you must do manually')

if parser.parse_args().quest == None and parser.parse_args().vote == None:
    print('Nothing TODO')
    parser.print_usage()
    parser.print_help()
