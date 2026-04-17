let startNode;
let goalNode;
let map;
class Node{

    constructor(coords, tile){
        this.coords = coords
        this.y = coords[0]
        this.x = coords[1]
        this.children = [];
        this.parent;
        this.wall = false
        this.tile = tile
    }

    findChildren(){
        if (map[this.y + 1][this.x]){
            this.children.push(map[this.y + 1][this.x])
        }
        if (map[this.y - 1][this.x]){
            this.children.push(map[this.y - 1][this.x])
        }
        if (map[this.y][this.x + 1]){
            this.children.push(map[this.y][this.x + 1])
        }
        if (map[this.y][this.x - 1]){
            this.children.push(map[this.y][this.x - 1])
        }
        console.log(this.children)
    }



}



class Algorithm{
    constructor(){
        this.visited = [];
        this.current;
        this.queue = [];
        this.path = []
    }
    
    color(){
        for (let i = 0; i < this.visited.length; i++){
            this.visited[i].tile.style.backgroundColor = "light green"
        }
    }

    effPath(){
        for (let i = 0; i < this.path.length; i++){
            this.path[i].tile.style.backgroundColor = "dark green"
        }
    }

    run(){}

    check(){
        if (this.current.coords == goalNode.coords){
            return true;
        } else {
            return false;
        }
    }

    traceBack(startNode){
        while (this.current != startNode){
            this.current = this.current.parent;
        }
    }

    buildBoard(startNode, goalNode){
        for (let y = 0; y < map.length; y++){
            for (let x = 0; x < map[y].length; x++){
                if (map[y][x].x == startNode.x && map[y][x].y == startNode.y){
                    map[y][x].tile.style.backgroundColor = "green"
                } else if (map[y][x].x == goalNode.x && map[y][x].y == goalNode.y){
                    map[y][x].tile.style.backgroundColor = "red"
                } else if(map[y][x].wall == true){
                    map[y][x].tile.style.backgroundColor = "black"
                } else{
                    map[y][x].tile.style.backgroundColor = "white"
                } 
            }
        }
    }

    
}

class BFS extends Algorithm{
    constructor(){
        super()
    }

    run(){
        let cur = this.current
        cur = startNode
        console.log(cur)
        while (cur != startNode){
            cur.children = this.cur.findChildren()
        }
    }
}


let BFSal = new BFS()

function createMap(width, height){    
    let nodes = [];
    let x = 0;
    let y = 0;
    document.getElementById("table").replaceChildren("")

    for (let i = 0; i < height; i++){
        let row = document.createElement("tr")
        document.getElementById("table").appendChild(row)
        nodes.push([])

        for (let j = 0; j < width; j++){
            nodes[i].push(new Node([y, x], document.createElement("td")));
            nodes[i][j].tile.style.width = "50px"
            nodes[i][j].tile.style.height = "50px"  
            nodes[i][j].tile.style.border = "3px solid black"
            nodes[i][j].tile.addEventListener("click", function(){
                if(nodes[i][j].wall == true){
                    nodes[i][j].wall = false;
                } else{
                    nodes[i][j].wall = true; 
                }
                BFSal.buildBoard(startNode,goalNode);})
            row.appendChild(nodes[i][j].tile)
            x++;
        }
        x = 0;
        y++;
    }

    

    return nodes
}

map = createMap(10,10)

document.getElementById("submit").addEventListener("click", function(){
    startNode = map[Number(document.getElementById("startY").value)][Number(document.getElementById("startX").value)]
    goalNode = map[Number(document.getElementById("goalY").value)][Number(document.getElementById("goalX").value)]
    let height = Number(document.getElementById("height").value)
    let width = Number(document.getElementById("width").value)
    map = createMap(height, width)
    for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
            map[j][i].wall = false
        }}
    BFSal.buildBoard(startNode, goalNode)
})
