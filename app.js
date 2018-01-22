const display = new ROT.Display({width: 50, height: 30, fontSize: 18, forceSquareRatio: true})
document.body.appendChild(display.getContainer())

const width = display.getOptions().width
const height = display.getOptions().height
const mapWidth = 10
const mapHeight = 10
const xOffset = width / 2 - mapWidth / 2
const yOffset = height / 2 - mapHeight / 2

const span = document.createElement('span')
document.body.appendChild(span)

let pos = { x: display.getOptions().width / 2, y: display.getOptions().height / 2 }

display.draw(pos.x, pos.y, '@')
span.innerText = `pos: x: ${pos.x}, y: ${pos.y}`

let map = []
let mapGenerator = new ROT.Map.Digger(8, 8)
mapGenerator.create((x, y, wall) => map.push({x, y, wall}))

let room = mapGenerator.getRooms()[0]

// console.log(map)
// console.log(mapGenerator.getRooms())
// console.log(mapGenerator.getCorridors())
console.log(room)

const contains = pos => pos.x > xOffset && pos.x < xOffset + mapWidth - 1 && pos.y > yOffset && pos.y < yOffset + mapHeight - 1

const drawMap = () => map.forEach(tile => display.draw(xOffset + tile.x, yOffset + tile.y, tile.wall ? '#' : '.'))

const drawPlayer = () => {
  display.draw(pos.x, pos.y, '@')
}

drawMap()
drawPlayer()

window.addEventListener('keydown', e => {
  display.clear()

  const code = e.keyCode

  let vk = '?'
  for (let name in ROT) {
    if (ROT[name] === code && name.indexOf('VK_') == 0) { vk = name }
  }

  if (code === ROT.VK_LEFT) {
    const newPos = { ...pos, x: pos.x - 1 }
    if (contains(newPos)) { pos = newPos }
  }
  else if (code === ROT.VK_UP) {
    const newPos = { ...pos, y: pos.y - 1 }
    if (contains(newPos)) { pos = newPos }
  }
  else if (code === ROT.VK_RIGHT) {
    const newPos = { ...pos, x: pos.x + 1 }
    if (contains(newPos)) { pos = newPos }
  }
  else if (code === ROT.VK_DOWN) {
    const newPos = { ...pos, y: pos.y + 1 }
    if (contains(newPos)) { pos = newPos }
  }

  drawMap()
  drawPlayer()
})