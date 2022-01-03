from collections import deque
import pickle
import argparse
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

#Prints level order traversal of the tree from the given root
def printLevel(root):        
    queue = deque()
    cur = 0
    queue.append((root, cur))
    while queue:
        x = queue.popleft()
        if x[1] > cur:
            cur += 1
            print("")
            print("")
            print("")
        print((x[0].prefix, x[0].isWord), end = " ")
        for i in x[0].nextWords:
            queue.append((x[0].nextWords[i], cur + 1))
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
        return (True, None, root.prefix)
    for i in root.nextWords:
        x = AIMove(root.nextWords[i])
        if not x[0]:
            return (True, i, x[2])
    for i in root.nextWords:
        x = AIMove(root.nextWords[i])
        return (False, i, x[2])
    
    
def word_to_node(s, root):
    cur = root
    for i in s:
        cur = cur.nextWords[i]
    return cur
    

if __name__ == "__main__":
    s = sys.argv[1]
    with open('pickle1','rb') as f:
        trie_root = pickle.load(f)
    word_node = word_to_node(s, trie_root)
    a = AIMove(word_node)
    print(a[0])
    print(a[1])
    print(a[2])
    sys.stdout.flush()
    
    
        


