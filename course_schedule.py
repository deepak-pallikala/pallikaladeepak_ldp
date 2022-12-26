print("Enter number of courses:")
n=int(input())
print("Enter number of prerequisites:")
p=int(input())
print("Enter the prerequisites:")
prerequisites=[]
flag=0
#Entering the prerequisites
for i in range(p):
    a,b=[int(i) for i in input().split()]
    prerequisites.append([a,b])
prereq={i:[] for i in range(n)}
for c,p in prerequisites:
    prereq[c].append(p)
ans=[]
#Initializing the visit and cycle as empty sets
visit,cycle=set(),set()
def dfs(c):
    if c in cycle:
        return False
    if c in visit:
        return True
    cycle.add(c)
    for p in prereq[c]:
        if(dfs(p)==False):
            return False
    cycle.remove(c)
    visit.add(c)
    ans.append(c)
    return True
#printing the empty list when there is a cycle
for c in range(n):
    if(dfs(c)==False):
        print([])
        flag=1
        break
#printing the list when there is no cycle
if(flag!=1):
    print(ans)


