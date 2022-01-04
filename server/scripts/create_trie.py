from collections import deque
import pickle
import sys

class TrieNode:
    def __init__(self, prefix, isWord, nextWords):
        self.prefix = prefix #the string, the word
        self.isWord = isWord #Boolean, if it's a leaf node
        self.nextWords = nextWords #Dictionary, a[i] contains TrieNode of the word self.prefix + i

#insert a node with a given word 
def insertword(root, word):
    if word == root.prefix:
        root.isWord = True
        return
    a = word[:(len(root.prefix) + 1)]
    b = word[len(root.prefix)]
    if not b in root.nextWords:
        root.nextWords[b] = TrieNode(a, False, {})
    insertword(root.nextWords[b], word)
    return
    

#Helper method used for implementation, plays out a move
def oneMove(node, alphabet): #returns TreeNode or None
    if not alphabet in node.nextWords:
        return None
    newNode = node.nextWords[alphabet]
    return newNode


#Gameplay method, needs the root of the Trie.
#Player1 is a bool which decides who goes first, true for player, false for ai
def gameplay(root, player1):
    if player1:
        curNode = root
        while not curNode.isWord:
            if len(curNode.prefix) % 2 == 0:
                print("Enter Player 1 letter:")
                player_alphabet = input()
                curNode = oneMove(curNode, player_alphabet)
                if curNode == None:
                    print("Invalid word")
                    return
                print(curNode.prefix)
            else:
                print("AI moves")
                AI_alphabet = AIMove(curNode)[1]
                curNode = oneMove(curNode, AI_alphabet)
                print(curNode.prefix)
        if len(curNode.prefix) % 2 == 0:
            print("Player wins")
        else:
            print("AI wins")
    else:
        curNode = root
        while not curNode.isWord:
            if len(curNode.prefix) % 2 == 1:
                print("Enter Player 1 letter:")
                player_alphabet = input()
                curNode = oneMove(curNode, player_alphabet)
                if curNode == None:
                    print("Invalid word")
                    return
                print(curNode.prefix)
            else:
                print("AI moves")
                AI_alphabet = AIMove(curNode)[1]
                curNode = oneMove(curNode, AI_alphabet)
                print(curNode.prefix)
        if len(curNode.prefix) % 2 == 1:
            print("Player wins")
        else:
            print("AI wins")
    return

#Returns AIMove from the given node
def AIMove(root):
    if root.isWord:
        return (True, None)
    for i in root.nextWords:
        x = AIMove(root.nextWords[i])
        if not x[0]:
            return (True, i)
    for i in root.nextWords:
        return (False, i)
    

if __name__ == "__main__":
    with open(sys.argv[1]) as f1:
        s = f1.read()
    x = list(s.split())
    testroot = TrieNode("", False, {})
    for word in x:
        insertword(testroot, word)
    with open("server/scripts/pickle1", "wb") as f:
        pickle.dump(testroot, f)
    
    
        


