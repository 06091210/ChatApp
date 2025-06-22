import asyncio
import websockets

connected = set()

async def echo(websocket, path):
    connected.add(websocket)
    try:
        async for message in websocket:
            print(f"受信: {message}")
            # 接続しているすべてのクライアントに送信
            for conn in connected:
                await conn.send(message)
    except websockets.exceptions.ConnectionClosed:
        print("クライアント切断")
    finally:
        connected.remove(websocket)

start_server = websockets.serve(echo, 'localhost', 8000)

print("WebSocketサーバーを起動中 ws://localhost:8000 ...")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
