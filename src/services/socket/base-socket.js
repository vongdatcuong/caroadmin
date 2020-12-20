//JOIN GLOBAL ROOM
const JoinGlobalRoom = (socket, user) => {
  socket.emit("Global-Room", { userID: user._id, username: user.username });
};

//GET ALL ONLINE USER
const GetGlobalUsers = (socket, dispatch) => {
  socket.on("Global-Users", (data) => {
    dispatch({ type: "Get-Global-User", payload: data });
  });
};

//CHAT ALL GLOBAL ROOM
const ChatGlobalRoom = (socket, chatMsg) => {
  socket.emit("Global-Chat", chatMsg);
};

//GET CHAT MESSAGE GLOBAL ROOM
const GetChatGlobalRoom = (socket, dispatch) => {
  socket.on("Global-Chat-Response", (data) => {
    dispatch({ type: "Add-Global-Chat", payload: data });
  });
};

//LOG OUT
const LogOut = (socket, user) => {
  socket.emit("Log-Out", {userID: user.userID});
};

//CREATE NEW ROOM
const CreatePlayingRoom = (socket, room) => {
  //room({title:string,creator:string})
  console.log(room);
  socket.emit("Create", room);
};

//GET ALL LIST ROOM
const GetListRoom = (socket, dispatch) => {
  socket.on("Playing-Room", (data) => {
    dispatch({ type: "Get-List-Room", payload: data });
  });
};

//LEAVE ROOM
const LeaveRoom = (socket, roomID, user) => {
  socket.emit("Leave-Room", {roomID: roomID, player: user});
};

//GET LEAVE PLAYER
const LeaveRoomPlayer = (socket, setState, roomID, onLeave) => {
  socket.on("Leave-Room-Player", (value) => {
    //if (value === roomID) {
    //  onLeave();
    //}
    setState({});
  });
};

// CLOSE ROOM
const CloseRoom = (socket, roomID, onCloseRoom) => {
  socket.on("Close-Room", (value) => {
    if (roomID === value){
      onCloseRoom();
    }
  })
}

//JOIN ROOM
const JoinRoom = (socket, roomID, player) => {
  socket.emit("Join-Room", {
    roomID: roomID,
    player: player,
  });
};

//GET SECOND PLAYER
const GetSecondPlayer = (socket, setState) => {
  socket.on("Second-Player", (value) => {
    setState(value);
  });
};

//GET FIRST PLAYER
const GetFirstPlayer = (socket, setState) => {
  socket.on("First-Player", (value) => {
    setState(value);
  });
};

//CHAT PRIVATE ROOM
const ChatPrivateRoom = (socket, roomID, chatMsg) => {
  socket.emit("Private-Room-Chat", { roomID: roomID, msg: chatMsg });
};

//GET ROOM CHAT LIST
const GetChatPrivateRoom = (socket, setState) => {
  socket.on("Private-Room-Chat-Response", (value) => {
    setState(value);
  });
};

// GET BOARD
const GetBoard = (socket, setState) => {
  socket.on("Board-Response", (board) => {
    setState(board);
  });
}

// MAKE A MOVE
const MakeAMove = (socket, roomID, user, boardProp) => {
  socket.emit("Make-a-move", {
    roomID: roomID,
    player: { playerID: socket.id, ...user },
    boardProp: boardProp
  });
}

// DECLARE WINNER
const DeclareWinner = (socket, handleWinner) => {
  socket.on("Declare-Winner-Response", (winner) => {
    handleWinner(winner);
  });
}

export {
  JoinGlobalRoom,
  GetGlobalUsers,
  ChatGlobalRoom,
  GetChatGlobalRoom,
  LogOut,
  CreatePlayingRoom,
  GetListRoom,
  LeaveRoom,
  JoinRoom,
  GetSecondPlayer,
  GetFirstPlayer,
  ChatPrivateRoom,
  GetChatPrivateRoom,
  LeaveRoomPlayer,
  GetBoard,
  MakeAMove,
  DeclareWinner,
  CloseRoom
};
