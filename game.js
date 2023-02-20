const buttonArray=['red','blue','green','yellow']
let gamePattern=[]
let userClickedPattern=[]
let level=0

const animatePress=(currentColor)=>{
    $(`#${currentColor}`).addClass('pressed')
    setTimeout(()=>{
        $(`#${currentColor}`).removeClass('pressed')
    },100)
}

const playSound=(btnColor)=>{
    sound= new Audio(`sounds/`+btnColor +'.mp3')
    sound.play()
}
const newSequence=(sequence=>{
    level++
    $('#level-title').text("Level "+level)
    let randomNumber = (Math.floor(Math.random()*4))
    let randomChosenColor=buttonArray[randomNumber]
    gamePattern.push(randomChosenColor)
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
    
})

const arrayCheck=(a,b)=>{
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    let first=a
    let second=b
    lastInputCheck(first,second)
}

const lastInputCheck=(a,b)=>{
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const gameOver=()=>{
    level=0
    gamePattern=[]
    userClickedPattern=[]
    started=false
}

const main=(userChoosenColor)=>{
    userClickedPattern.push(userChoosenColor)
    console.log('user ='+userChoosenColor,'pattern ='+gamePattern)
    if (lastInputCheck(userClickedPattern,gamePattern)){
        console.log('true')
        if (userClickedPattern.length===gamePattern.length){
            console.log('correct')
            if(lastInputCheck(userClickedPattern,gamePattern)){
                userClickedPattern=[]
                setTimeout(newSequence,1000)
            }
            else{
                playSound('wrong')
                $('body').addClass('game-over')
                $('#level-title').text("Game Over, press any key to try again")
                gameOver()
            }
        }
        else{
            console.log(userChoosenColor)
        }
    }
    else{
    playSound('wrong')
    $('body').addClass('game-over')
    $('#level-title').text("Game Over, press any key to try again")
    gameOver()
    }
}

const clickHandler=(color)=>{
    let userChoosenColor=color.target.id
    animatePress(userChoosenColor)
    playSound(userChoosenColor)
    if(started){
        main(userChoosenColor)
    }

}

let started=false
$(document).on('keypress',()=> {
    if (!started) {
        $('body').removeClass('game-over')
        newSequence()
        $('#level-title').text("Level 1")
        started = true
    }
    })

$('.btn').on('click',(element)=>{
    clickHandler(element)
})




