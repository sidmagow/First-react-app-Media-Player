import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import createFragment from 'react-addons-create-fragment';
import $ from 'jquery';


class Timeline extends Component{
    render(){
       var value=0;
        return(
        <div className="Player-timeline">
        <span className="actualTime">{value}</span>
        <div className="timeline"></div>
            <span className="songDuration">{this.props.songDuration}</span>
        </div>
        );
    }
}
class Button extends Component{
   constructor(props){
       super(props);
       this.handleButtonClick=this.handleButtonClick.bind(this);
   }
   handleButtonClick(e){
       switch (this.props.work){
           case '<':{

           }
       }
   }
    render(){
        return(
            <div className="Player-buttons" onClick={this.handleButtonClick}>
                {this.props.work}
            </div>
        );
    }
}

class MusicPlayer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var songDuration;
         return(
         <div className="Player">
         <Button work="<"/>
         <Button work="||"/>
         <Button work=">"/>
         <Timeline songDuration={songDuration}/>
         <Button work=" &#8635;"/>
             <audio id="MusicPlayer1" src=""
                    autoPlay="autoplay">
             </audio>
         </div>

         );



    }
}

class MusicRow extends Component{
    constructor(props){
        super(props);
        this.handleRowClick=this.handleRowClick.bind(this);


    }

    handleRowClick(event){
        var file={};
        console.log($(event.target).text());
        for(var i in this.props.musicObjects){
            if(this.props.musicObjects[i].name===$(event.target).text()){
              file=this.props.musicObjects[i];
              break;
            }
        }

        var reader = new FileReader();

        reader.onload = function(e) {
            var aud1=document.getElementById("MusicPlayer1");
            aud1.src = reader.result;
        };
        reader.readAsDataURL(file);


        }

    render(){

        console.log("sdas");
        return(
            <li onClick={this.handleRowClick}>
                {this.props.songName}
            </li>

        );
    }
}

class MusicList extends  Component{
   constructor(props){
       super(props);

   }
    render(){


        var songList=this.props.musicList;
        var newList=songList.map((song)=>{ return (<MusicRow songName={song} musicObjects={this.props.musicObjects}/>) })
        return(
            <ol  className="musiclist" key="">
                {newList}
            </ol>
        );
        }
    }

class SearchBar extends  Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
        <form className="Form-search">
            <input type="text" placeholder="Search..." />
        </form>
        );
    }
}
class AddMusic extends Component{

    constructor(props){
        super(props);
        this.handleInput=this.handleInput.bind(this);
    }
    handleInput(event){
         let re = /(?:\.([^.]+))?$/;
        let ext = re.exec(event.target.files[0].name)[1];
        if(ext==="mp3"||ext==="wav"||ext==="aiff"||ext==="aac"){
            const extension=event.target.files[0].name.indexOf(ext)
            let songname=event.target.files[0].name;
            let songObject=event.target.files[0]
            console.log(event.target.files[0]);
        this.props.musicListChange(songname,songObject);}

    }
    render(){
        return(
        <input className="Form-addmusic" type="file" onChange={this.handleInput} />

        );
    }
}

class App extends Component {
  constructor(props){
      super(props);
      this.state={
          musicList:[],
          musicObjects:[],
          searchText:''
      };
    this.handleMusicListChange=this.handleMusicListChange.bind(this);
  }

  handleMusicListChange(x,z){
      let y=[];
          y=this.state.musicList;
          y.push(x);
let w=[];
w=this.state.musicObjects;
w.push(z);
console.log(this.state.musicObjects)
      this.setState({
          musicList:y,
          musicObjects:w

      })
  }
    render() {
    return (
       <div className="Music-Player">
           <SearchBar/>
      <AddMusic musicList={this.state.musicList} musicListChange={this.handleMusicListChange} musicObjects={this.state.musicObjects}/>
       <MusicList musicList={this.state.musicList} musicObjects={this.state.musicObjects}/>
           {<MusicPlayer/>}

       </div>
    );
  }
}

export default App;
