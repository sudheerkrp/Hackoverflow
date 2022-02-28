let matchColor, isEasy = true;
const easyBtn = document.getElementById('easy');
const hardBtn = document.getElementById('hard');
const newColorsBtn = document.getElementById('new-colors');
const statusBox = document.getElementById('status');
const headingBox = document.querySelector('.heading-box');
const tiles = document.querySelectorAll('.tile');

easyBtn.addEventListener('click', ()=>{handelLevel(true)});
hardBtn.addEventListener('click', ()=>{handelLevel(false)});
newColorsBtn.addEventListener('click', ()=>{initialize()});

Array.from(tiles).forEach((tile)=>{
    tile.addEventListener('click', ()=>{
        if(tile.style.backgroundColor == matchColor)
        {
            statusBox.innerText = 'Correct!!!';
            Array.from(tiles).forEach((tile)=>{
                tile.style.backgroundColor = matchColor;
                tile.style.visibility = 'visible';
            })
            newColorsBtn.innerText = 'PLAY AGAIN';
            headingBox.style.backgroundColor = matchColor;
        }
        else
        {
            tile.style.visibility = 'hidden';
            statusBox.innerText = 'Try Again';
        }
        statusBox.style.visibility = 'visible';
    })
})

function generateColorCode()
{
    let arr = new Array();
    arr[0] = Math.ceil(255*Math.random());
    arr[1] = Math.ceil(255*Math.random());
    arr[2] = Math.ceil(255*Math.random());
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

function initialize()
{
    let headingsColor = 'rgb(255, 255, 255)';
    do // Logic to avoid collision between required color and color of headings
    {
        matchColor = generateColorCode();
    }
    while(matchColor === headingsColor);
    handelLevel(isEasy);
    const colorCode = document.getElementById('color-code');
    colorCode.innerText = matchColor;
    Array.from(tiles).forEach((tile, index)=>{
        let isColorAlreadyGenerated, tilesBoxBackgroundColor = 'rgb(42, 41, 40)';
        do
        {
            isColorAlreadyGenerated = false;
            tile.style.backgroundColor = generateColorCode();
            // Logic to avoid more than one tile with same color and collision of tile color with background color of tiles-box 
            if(tile.style.backgroundColor === tilesBoxBackgroundColor)
                isColorAlreadyGenerated = true;
            while(!isColorAlreadyGenerated && index > 0)
            {
                index--;
                if(tile.style.backgroundColor === tiles[index].style.backgroundColor || tile.style.backgroundColor === matchColor)
                {
                    isColorAlreadyGenerated = true;
                    break;
                }
            }
        }
        while(isColorAlreadyGenerated);
        tile.style.visibility = 'visible';
    });
    if(isEasy)
        (tiles[Math.ceil(2*Math.random())]).style.backgroundColor = matchColor;
    else
        (tiles[Math.ceil(5*Math.random())]).style.backgroundColor = matchColor;
    statusBox.style.visibility = 'hidden';
    newColorsBtn.innerText = 'NEW COLORS';
    headingBox.style.backgroundColor = 'rgb(255,188,2)';
}

function handelLevel(level)
{
    const row2 = document.getElementById('row-2');
    if(isEasy != level)
    {
        isEasy = level;
        initialize();
    }
    isEasy = level;
    if(isEasy)
        row2.style.display = 'none';
    else
        row2.style.display = 'flex';
}

initialize();