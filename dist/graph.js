"use strict";
class Graph {
    constructor() {
        this.vertices = {}; //список смежности
    }
    addVertex(value) {
        if (!this.vertices[value]) {
            this.vertices[value] = [];
        }
    }
    addEdge(vertex1, vertex2) {
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
            throw new Error("В графе нет таких вершин");
        }
        if (!this.vertices[vertex1].includes(vertex2)) {
            this.vertices[vertex1].push(vertex2);
        }
        if (!this.vertices[vertex2].includes(vertex1)) {
            this.vertices[vertex2].push(vertex1);
        }
    }
    removeVertex(vertex) {
        if (!(vertex in this.vertices)) {
            throw new Error("В графе нет такой вершины");
        }
        delete this.vertices[vertex];
        for (let key in this.vertices) {
            this.vertices[key] = this.vertices[key].filter((v) => v !== vertex);
        }
    }
    removeEdge(vertex1, vertex2) {
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
            throw new Error("В графе нет таких вершин");
        }
        this.vertices[vertex1] = this.vertices[vertex1].filter((v) => v !== vertex2);
        this.vertices[vertex2] = this.vertices[vertex2].filter((v) => v !== vertex1);
    }
    find(vertex) {
        return vertex in this.vertices;
    }
    updateVertex(oldVertex, newVertex) {
        if (!(oldVertex in this.vertices)) {
            throw new Error("В графе нет такой вершины");
        }
        if (newVertex in this.vertices) {
            throw new Error("Вершина с таким значением уже существует");
        }
        const edges = this.vertices[oldVertex];
        delete this.vertices[oldVertex];
        this.vertices[newVertex] = edges;
        for (let key in this.vertices) {
            this.vertices[key] = this.vertices[key].map((v) => v === oldVertex ? newVertex : v);
        }
    }
    getVertexCount() {
        return Object.keys(this.vertices).length;
    }
    bfs(startVertex, callback) {
        let list = this.vertices; // список смежности
        let queue = [startVertex]; // очередь вершин для перебора
        let visited = { [startVertex]: 1 }; // посещенные вершины
        while (queue.length) {
            let activeVertex = queue.shift();
            queue.push(...checkNeighbours(activeVertex));
        }
        queue = Object.keys(this.vertices);
        while (queue.length) {
            let activeVertex = queue.shift();
            if (!visited[activeVertex]) {
                visited[activeVertex] = 1;
                queue.push(...checkNeighbours(activeVertex));
            }
        }
        function checkNeighbours(vertex) {
            callback(vertex);
            let neighboursList = list[vertex];
            let unvisited = [];
            neighboursList.forEach((neighbour) => {
                if (!visited[neighbour]) {
                    visited[neighbour] = 1;
                    unvisited.push(neighbour);
                }
            });
            return unvisited;
        }
    }
    bfsWithDistance(startVertex) {
        let list = this.vertices;
        let queue = [startVertex];
        let visited = { [startVertex]: 1 };
        let distance = { [startVertex]: 0 };
        let previous = { [startVertex]: null };
        function checkNeighbours(vertex) {
            let neighboursList = list[vertex];
            neighboursList.forEach((neighbour) => {
                if (!visited[neighbour]) {
                    visited[neighbour] = 1;
                    queue.push(neighbour);
                    previous[neighbour] = vertex;
                    distance[neighbour] = distance[vertex] + 1;
                }
            });
        }
        while (queue.length) {
            let activeVertex = queue.shift();
            checkNeighbours(activeVertex);
        }
        return { distance, previous };
    }
    findShortestPath(startVertex, finishVertex) {
        let { previous } = this.bfsWithDistance(startVertex);
        let path = [];
        let currentVertex = finishVertex;
        while (currentVertex !== startVertex) {
            path.unshift(currentVertex);
            currentVertex = previous[currentVertex];
        }
        path.unshift(startVertex);
        return path.reduce((pathString, item, index, arr) => {
            if (index === arr.length - 1) {
                pathString += item;
            }
            else {
                pathString += item + "->";
            }
            return pathString;
        }, "");
    }
}
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("C", "D");
graph.addEdge("C", "E");
graph.addEdge("A", "F");
graph.addEdge("F", "G");
console.log(graph.findShortestPath("A", "G"));
