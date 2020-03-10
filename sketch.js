let table;
let people = [];
let red, orenge, yellow, green, blue, purple, pink, canX ;
let canY = 700;

let genDefs = [];
let maleDefs = [];
let femaleDefs = [];
let genfluDefs = [];
let agenDefs = [];
let nongenDefs = [];
let gqueerDefs = [];
let transDefs = [];

let colorPalet;

let count=0;
let c =0;


var DefB=[];

function preload() {
  //table = loadTable('https://docs.google.com/spreadsheets/d/e/2PACX-1vSpQmll0IN35vyqKtiB31pqcYN2d5a8JBtJi1qw4DnclPhxjefbq9J89rG6C_t1knCMYoo9qrPhcp3S/pub?output=csv', 'csv', 'header');
  table = loadTable('FormResponses.csv', 'csv', 'header');
  console.log("data loaded");
}

function setup() {
  //count the columns
  canX=windowWidth;
  createCanvas(canX, canY);
  background(color('#2D334A'));
  
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  red = color('#E6AB9E');
  orange = color('#E6C09E');
  yellow = color('#F0F2A7');
  green = color('#A7F2C1');
  blue = color('#9EE6E6');
  purple = color('#9AAEFC');
  pink = color('#E6A1C3');
  colorPalet = [red,orange,yellow,green,blue,purple,pink,color(230, 171, 158,100),color(230, 192, 158,100),color(240, 242, 167,100),color(167, 242, 193,100),color(158, 230, 230,100),color(154, 174, 252,100),color(230, 161, 195,100)];
  
  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++){
    console.log(table.getString(r,2));
    
    var nick, nat,eth,a,car,gen,se,des,ide,iced,cha,wi,mov,ha,st1,st2,connection,anonymous;
    var genVal=[];
    var seVal =[];
    nick = table.getString(r,2);
    nat = table.getString(r,3);
    eth = table.getString(r,4);
    a = table.getString(r,5);
    car = table.getString(r,6);
    gen = table.getString(r,7);
    se = table.getString(r,8);
    des = table.getString(r,9);
    ide = table.getString(r,10);
    iced = table.getString(r,11);
    cha = table.getString(r,12);
    wi = table.getString(r,13);
    mov = table.getString(r,14);
    ha = table.getString(r,15);
    for(var i = 0; i<14; i+=2){
      genVal.push(int(table.getString(r,16+i)));
    } 
    //each gender's def words
    
    maleDefs.push(table.getString(r,17).toUpperCase().trim());
    femaleDefs.push(table.getString(r,19).toUpperCase().trim());
    genfluDefs.push(table.getString(r,21).toUpperCase().trim());
    agenDefs.push(table.getString(r,23).toUpperCase().trim());
    nongenDefs.push(table.getString(r,25).toUpperCase().trim());
    gqueerDefs.push(table.getString(r,27).toUpperCase().trim());
    transDefs.push(table.getString(r,29).toUpperCase().trim());
    
    //console.log(maleDefs.length);
    //making an array of all def for gender together (upper case, no space, no duplicate)
    for(var i = 0; i<14; i+=2){
      //making it upper and no space
      var a =table.getString(r,17+i).toUpperCase().trim();
      var same=false;
      var ret=[];
      for(var j =0; j<genDefs.length; j++){
        //checking if this def has came up before 
        if(a==genDefs[j]){
          same = true;
        }
        //checking if this is just blank answer
        else if(a==""){
          same = true;
        }
      }
      //adding new word to array
      if(!same){
        //var ret = new Array(a);
        genDefs.push(a)
      }
    }
    
    
    //console.log("gen val is "+genVal);
    for(var i = 0; i<14; i+=2){
      seVal.push(int(table.getString(r,30+i)));
    }
    st1 = table.getString(r,47);
    st2 = table.getString(r,49);
    connection = table.getString(r, 50);
    if(table.getString(r,51)=="No"){
      anonymous = true;
    }else if(table.getString(r,51)=="Yes"){
      anonymous =false;
    } 
    var ranx = random(100, canX-200);
    var rany = random(100, canY-200);

    if(r==0){
      ranx = canX/2;
      rany = canY/2;

    }
    
    print(people.length);
    for(var i=people.length;i>0;i--){
      //console.log("at "+ i);
      var preX = people[i-1].x;
      var preY = people[i-1].y;
      //console.log("dis with "+(i-1)+ " is "+dist(preX,preY,ranx,rany));
      while(dist(preX,preY,ranx,rany)<200){
        ranx = random(50, canX-100);
        rany = random(50, canY-100);
        //console.log("in while loop "+i);
        i=people.length;
      }

      if(ranx>canX-100){
        ranx = canX-100;
      }
      if(rany>canY-100){
        rany = canY-100;
      }
      //console.log("dis with "+(i-1)+ " is "+dist(preX,preY,ranx,rany));
    }
    

    //console.log("name is" + table.getString(r,2));
    people.push(new Person(nick, nat,eth,a,car,gen,se,des,ide,iced,cha,wi,mov,ha,genVal,seVal,st1,st2,connection,anonymous,ranx,rany));
    console.log("pushing people");
  }
  /*
  //checking collusion
  for(var i =1 ; i<people.length; i++){
    for(var j = i+1; j<people.length; j++){
      var dis = dist(people[i].x,people[i].y,people[j].x,people[j].y);

      if(dis < 200){
        var ranx = people[i].x + random(50, 100);
        var rany = people[i].y + random(50, 100);
        if(dis<=200){
            ranx = people[i].x+random(50, 100);
            rany = people[i].y+random(50, 100);
        }
        
        if(ranx+100>canX){
          ranx= canX-150;
        }
        if(rany+100>canY){
          rany= canY-150;
        }
        //console.log("dis with "+i+ " and " +j+" is now "+dis);
        people[i].changeXY(ranx,rany);
        i =1;
        j = i+1;
      }
    }
  }*/
  
  //console.log(maleDefs.length);
  for(var i = 0; i<genDefs.length; i++){
    var arr;
    var z = genDefs[i];
    var m =false; 
    var f = false;
    var g =false;
    var a = false;
    var n =false;
    var q = false;
    var t = false;
    for(var j =0; j<maleDefs.length;j++){
      if(z==maleDefs[j]){
        m=true;
      }
      if(z==femaleDefs[j]){
        f=true;
      }
      if(z==genfluDefs[j]){
        g=true;
      }
      if(z==agenDefs[j]){
        a=true;
      }
      if(z==nongenDefs[j]){
        n=true;
      }
      if(z==gqueerDefs[j]){
        q=true;
      }
      if(z==transDefs[j]){
        t=true;
      }
    }
    arr=[m,f,g,a,n,q,t];
    DefB.push(arr);
  }
  //console.log("def binary is" +DefB.length);
  
}

function draw(){
  background(color('#2D334A'));
  //darwConnection();
  darwdef();
  /*
  if(int(millis()*100)%genDefs.length==0){
    c++
    if(c==genDefs.length){
      c=0;
    }
  }
  */
  if(int(millis()*100)%7==0){
    c++
  if(c==7){
    c=0;
  }
}
}

function darwdef(){
  //decideing on position
  //console.log("angle is "+ang);
  var pos = [];
  var posW=[];
  var mdefPos=[];
  var fdefPos=[];
  var gdefPos=[];
  var adefPos=[];
  var ndefPos=[];
  var qdefPos=[];
  var tdefPos=[];
  var ang = 2*PI/genDefs.length;
  
  //console.log("angle is "+ang);
  textSize(8);
  textAlign(LEFT);
  //creating array of vector in circle
  push();
  translate(canX/4,canY/2);
  for(i=0;i<genDefs.length;i++){
    pos.push(createVector(cos(ang*i)*300, sin(ang*i)*300));
    posW.push(createVector(cos(ang*i)*330, sin(ang*i)*330));
  }
  
  
  for(i=0;i<DefB.length;i++){
    if(DefB[i][0]==true){
      p = pos[i];
      mdefPos.push(p);
    }
    if(DefB[i][1]==true){
      p = pos[i];
      fdefPos.push(p);
    }
    if(DefB[i][2]==true){
      p = pos[i];
      gdefPos.push(p);
    }
    if(DefB[i][3]==true){
      p = pos[i];
      adefPos.push(p);
    }
    if(DefB[i][4]==true){
      p = pos[i];
      ndefPos.push(p);
    }
    if(DefB[i][5]==true){
      p = pos[i];
      qdefPos.push(p);
    }
    if(DefB[i][6]==true){
      p = pos[i];
      tdefPos.push(p);
    }
  }
  //console.log(mdefPos.length);
  noFill();
  if(c==0){
    stroke(colorPalet[0]);
  }else{
    stroke(colorPalet[7]);
  }
  for(var i=0;i<mdefPos.length;i++){
    for(var j=i;j<mdefPos.length;j++){
      line(mdefPos[i].x, mdefPos[i].y,mdefPos[j].x, mdefPos[j].y);
    }
  }

  if(c==1){
    stroke(colorPalet[1]);
  }else{
    stroke(colorPalet[8]);
  }
  for(var i=0;i<fdefPos.length;i++){
    for(var j=i;j<fdefPos.length;j++){
      line(fdefPos[i].x, fdefPos[i].y,fdefPos[j].x, fdefPos[j].y);
    }
  }

  if(c==2){
    stroke(colorPalet[2]);
  }else{
    stroke(colorPalet[9]);
  }
  for(var i=0;i<gdefPos.length;i++){
    for(var j=i;j<gdefPos.length;j++){
      line(gdefPos[i].x, gdefPos[i].y,gdefPos[j].x, gdefPos[j].y);
    }
  }

  if(c==3){
    stroke(colorPalet[3]);
  }else{
    stroke(colorPalet[10]);
  }
  for(var i=0;i<adefPos.length;i++){
    for(var j=i;j<adefPos.length;j++){
      line(adefPos[i].x, adefPos[i].y,adefPos[j].x, adefPos[j].y);
    }
  }

  if(c==4){
    stroke(colorPalet[4]);
  }else{
    stroke(colorPalet[11]);
  }
  for(var i=0;i<ndefPos.length;i++){
    for(var j=i;j<ndefPos.length;j++){
      line(ndefPos[i].x, ndefPos[i].y,ndefPos[j].x, ndefPos[j].y);
    }
  }

  if(c==5){
    stroke(colorPalet[5]);
  }else{
    stroke(colorPalet[12]);
  }
  for(var i=0;i<qdefPos.length;i++){
    for(var j=i;j<qdefPos.length;j++){
      line(qdefPos[i].x, qdefPos[i].y,qdefPos[j].x, qdefPos[j].y);
    }
  }

  if(c==6){
    stroke(colorPalet[6]);
  }else{
    stroke(colorPalet[13]);
  }
  for(var i=0;i<tdefPos.length;i++){
    for(var j=i;j<tdefPos.length;j++){
      line(tdefPos[i].x, tdefPos[i].y,tdefPos[j].x, tdefPos[j].y);
    }
  }

  if(ang*i>PI/4&&ang*i<PI*3/4){
    textAlign(CENTER,BOTTOM);
  }else if(ang*i>PI*3/4&&ang*i<PI*5/4){
    textAlign(RIGHT,CENTER);
  }else if(ang*i>PI*5/4&&ang*i<PI*7/4){
    textAlign(CENTER,TOP);
  }else{
    textAlign(LEFT,CENTER);
  }


  //displaying text at that position
  noStroke();
  fill(255,50);
  //console.log("running for "+c);
  for(i=0;i<posW.length;i++){
    var px = pos[i].x;
    var py = pos[i].y;
    fill(255,50);
    text(genDefs[i], posW[i].x,posW[i].y);
    if(c==0){
      for(var j=0;j<mdefPos.length;j++){
        if(px== mdefPos[j].x && py== mdefPos[j].y){
          fill(255,255);
          text(genDefs[i], posW[i].x,posW[i].y);
        }
      }
    }else if(c==1){
      for(var j=0;j<fdefPos.length;j++){
        if(px== fdefPos[j].x && py== fdefPos[j].y){
          fill(255,255);
          text(genDefs[i], posW[i].x,posW[i].y);
        }
      }
    }
    else if(c==2){
      for(var j=0;j<gdefPos.length;j++){
        if(px== gdefPos[j].x && py== gdefPos[j].y){
          fill(255,255);
          text(genDefs[i], posW[i].x,posW[i].y);
        }
      }
    }else if(c==3){
      for(var j=0;j<adefPos.length;j++){
        if(px== adefPos[j].x && py== adefPos[j].y){
          fill(255,255);
          text(genDefs[i], posW[i].x,posW[i].y);
        }
      }
    }else if(c==4){
      for(var j=0;j<ndefPos.length;j++){
        if(px== ndefPos[j].x && py== ndefPos[j].y){
          fill(255,255);
          text(genDefs[i], posW[i].x,posW[i].y);
        }
      }
    }else if(c==5){
      for(var j=0;j<qdefPos.length;j++){
        if(px== qdefPos[j].x && py== qdefPos[j].y){
          fill(255,255);
          text(genDefs[i], posW[i].x,posW[i].y);
        }
      }
    }else if(c==6){
      for(var j=0;j<tdefPos.length;j++){
        if(px== tdefPos[j].x && py== tdefPos[j].y){
          fill(255,255);
          text(genDefs[i], posW[i].x,posW[i].y);
        }
      }
    }
    //push();
    //rotate(ang);
    //circle(pos[i].x,pos[i].y,10);
    //pop();
  }
  pop();
}

function darwConnection(){
  for(var i = 0; i<people.length;i++){
    //console.log("displaying"+i);
    //translate(100, 0);

    //placing first person in center
    if(i==0){
      for(var j=0; j<people.length;j++){
        people[i].connection(people[j].x,people[j].y);
      }
    }
    for(var j =i+1; j<people.length-1;j++){
      if(people[i].conect==people[j].conect){
        people[i].connection(people[j].x,people[j].y);
      }
    }
    //calling other function that hadles the drawing calculation
    people[i].displayConnection();
    people[i].displayChart();
    people[i].displayName();
  }
}

//person class
let Person = function(nick, nat,eth,a,car,gen,se,des,ide,iced,cha,wi,mov,ha,genVal,seVal,st1,st2,connection,anonymous,ranX,ranY){
  this.nickname = nick;
  this.nationality = nat;
  this.ethnicity = eth;
  this.age = a;
  this.career = car;
  this.gender = gen;
  this.sexuality = se;
  this.descriptions =des;
  this.ideal = ide; 
  this.icedcoffee = iced;
  this.chair = cha;
  this.wiki = wi;
  this.movie = mov;
  this.hair = ha;
  this.genderVal = genVal;
  
  this.sexualityVal = seVal;
  //console.log("sexuality val is" +this.sexualityVal);
  this.story1 = st1;
  this.story2 = st2;
  this.conect = connection;
  this.any = anonymous;

  this.x = ranX;
  this.y = ranY;

  //assigning color 
  if(this.gender=="Male"){
    this.genColor = colorPalet[0];
  }else if(this.gender=="Female"){
    this.genColor = colorPalet[1];
  }else if(this.gender=="Genderfluid"){
    this.genColor = colorPalet[2];
  }else if(this.gender=="Agender"){
    this.genColor = colorPalet[3];
  }else if(this.gender=="Non-binary"){
    this.genColor = colorPalet[4];
  }else if(this.gender=="Genderqueer"){
    this.genColor = colorPalet[5];
  }else if(this.gender=="Trans"){
    this.genColor = colorPalet[6];
  }else{
    this.genColor = colorPalet[7];
  }
  //assigning color 
  if(this.sexuality=="Stright"){
    this.seColor = colorPalet[0]; 
  }else if(this.sexuality=="Gay"){
    this.seColor = colorPalet[1]; 
  }else if(this.sexuality=="Lesbian"){
    this.seColor = colorPalet[2]; 
  }else if(this.sexuality=="Queer"){
    this.seColor= colorPalet[3]; 
  }else if(this.sexuality=="Bisexual"){
    this.seColor = colorPalet[4]; 
  }else if(this.sexuality=="Pansexual"){
    this.seColor = colorPalet[5]; 
  }else if(this.sexuality=="Asexual"){
    this.seColor = colorPalet[6]; 
  }else if(this.sexuality=="Questioning"){
    this.seColor = colorPalet[7]; 
  }
  
  
  //print(this.y);
}

Person.prototype.displayConnection = function(){
  //this displays circles around the people
  stroke(255);
  strokeWeight(2);
  fill(color('#2D334A'));
  stroke(this.seColor);
  ellipse(this.x,this.y,120,120);
  stroke(this.genColor);
  ellipse(this.x,this.y,110,110);
  
}

Person.prototype.displayName = function(){
  //this displays names of people
  textSize(12);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  //checking if people are confortable having name on web
  if(this.any){
    text(this.nickname,this.x-50,this.y-50,100,100);
  }
}

Person.prototype.connection = function(nextX,nextY){
  //drawing line between two people
  strokeWeight(1);
  stroke(255);
  line(this.x,this.y,nextX,nextY);
}

Person.prototype.changeXY = function(newX,newY){
  this.x=newX;
  this.y=newY;
}

Person.prototype.displayChart = function(){
  //console.log("gen val is "+this.genderVal);
  var ang = 2*PI/7
  push();
  translate(this.x, this.y);

  fill(this.genColor);
  stroke(this.genColor);
  pos1 = createVector(cos(ang*0)*this.genderVal[0]*5, sin(ang*0)*this.genderVal[0]*5);
  pos2 = createVector(cos(ang*1)*this.genderVal[1]*5, sin(ang*1)*this.genderVal[1]*5);
  pos3 = createVector(cos(ang*2)*this.genderVal[2]*5, sin(ang*2)*this.genderVal[2]*5);
  pos4 = createVector(cos(ang*3)*this.genderVal[3]*5, sin(ang*3)*this.genderVal[3]*5);
  pos5 = createVector(cos(ang*4)*this.genderVal[4]*5, sin(ang*4)*this.genderVal[4]*5);
  pos6 = createVector(cos(ang*5)*this.genderVal[5]*5, sin(ang*5)*this.genderVal[5]*5);
  pos7 = createVector(cos(ang*6)*this.genderVal[6]*5, sin(ang*6)*this.genderVal[6]*5);
  beginShape();
  vertex(pos1.x,pos1.y);
  vertex(pos2.x,pos2.y);
  vertex(pos3.x,pos3.y);
  vertex(pos4.x,pos4.y);
  vertex(pos5.x,pos5.y);
  vertex(pos6.x,pos6.y);
  vertex(pos7.x,pos7.y);
  endShape(CLOSE);
  
  stroke(this.seColor);
  noFill();
  po1 = createVector(cos(ang*0)*this.sexualityVal[0]*5, sin(ang*0)*this.sexualityVal[0]*5);
  po2 = createVector(cos(ang*1)*this.sexualityVal[1]*5, sin(ang*1)*this.sexualityVal[1]*5);
  po3 = createVector(cos(ang*2)*this.sexualityVal[2]*5, sin(ang*2)*this.sexualityVal[2]*5);
  po4 = createVector(cos(ang*3)*this.sexualityVal[3]*5, sin(ang*3)*this.sexualityVal[3]*5);
  po5 = createVector(cos(ang*4)*this.sexualityVal[4]*5, sin(ang*4)*this.sexualityVal[4]*5);
  po6 = createVector(cos(ang*5)*this.sexualityVal[5]*5, sin(ang*5)*this.sexualityVal[5]*5);
  po7 = createVector(cos(ang*6)*this.sexualityVal[6]*5, sin(ang*6)*this.sexualityVal[6]*5);

  beginShape();
  vertex(po1.x,po1.y);
  vertex(po2.x,po2.y);
  vertex(po3.x,po3.y);
  vertex(po4.x,po4.y);
  vertex(po5.x,po5.y);
  vertex(po6.x,po6.y);
  vertex(po7.x,po7.y);
  endShape(CLOSE);

  pop();
}



