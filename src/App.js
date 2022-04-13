//variety

import {useEffect, useState} from "react";
import _ from "lodash";

const varietyFilter = [{key: 1, name: 'varietyone'}, {key: 2, name: 'varietytwo'}, {
    key: 3,
    name: 'varietythree'
}, {key: 4, name: 'varietyfour'}, {key: 5, name: 'varietyfive'}, {key: 6, name: 'varietysix'}];

// 보물을 찾았을시에 안내문구 yes or no 출
// 게임 통과하면 다음 난이도로 이동
// count 초기화
// 랜덤 보물위치 재배열
// 맵 사이즈 변경

const App = () => {

    const [step, setStep] = useState(5)
    const [count, setCount] = useState(0)
    const [finish, setFinish] = useState(false)
    const [treasureKey, setTreasureKey] = useState([Math.floor(Math.random() * 25), Math.floor(Math.random() * 25)])

    const trigger = () => {
        setCount(0);
        setFinish(false);
        setTreasureKey([Math.floor(Math.random() * 25), Math.floor(Math.random() * 25)])
    }

    const nextStep = () => {
        if (step === 5) {
            setStep(8);
            trigger();
        } else if (step === 8) {
            setStep(10);
            trigger();
        } else if (step === 10) {
            setStep(15);
            trigger();
        } else if (step === 15) {
            alert('최종 난이도 입니다.')
        }

    }
    const Box = (param) => {
        console.log(param,'::')
        const [blue, setBlue] = useState(false)
        useEffect(()=>{
            if(count===0){
                setBlue(false)
            }
        },[count])
        const checkChange = (e) => {
            setBlue(e.target.checked)
            if (e.target.checked) {
                if (count < 8) {
                    setCount(count + 1)

                    const result = treasureKey.filter(src => param === src)[0]
                    if (result) {
                        setFinish(true)
                        alert('WINNER WINNER CHICKEN DINNER! \n Do you wanna go to next step?')
                    }
                } else {
                    alert('Do Again Bitch')
                    setFinish(true)
                }
            }
        }
        return <input type='checkbox' key={param.param} checked={blue} onChange={checkChange} style={{height: 15, width: 15}}></input>
    }

    const makeMap = (param) => {
    console.log(treasureKey)
        let Bowl = []

        for (var i = 0; i < param; i++) {
            Bowl.push(<br/>)
            for (var j = 0; j < param; j++) {
                Bowl.push(Box(((i * param) + j)))
            }
        }
        return Bowl.map(res => {
            return res
        })
    }
    //
    // useEffect(()=>{
    //
    //     alert(`Start ${step} x ${step} Find a treasure Game.`)
    //
    // },[step])

    return (
        <>
            <div style={{width: '100%'}}>
                <div style={{width: 600, margin: '0px auto'}}>
                    <button onClick={() => {
                        setStep(5);
                        trigger();
                    }}>5
                    </button>
                    <button onClick={() => {
                        setStep(5);
                        trigger();
                    }}>8
                    </button>
                    <button onClick={() => {
                        setStep(10);
                        trigger();
                    }}>10
                    </button>
                    <button onClick={() => {
                        setStep(15);
                        trigger();
                    }}>15
                    </button>
                    {makeMap(step)}
                </div>

                <div>남은 시도 : {9 - count}</div>
            </div>

            {finish && <div>
                <button onClick={trigger}>다시 시작</button>
                <button onClick={nextStep}>다음 난이도 이동</button>
            </div>}
        </>
    );
}

export default App




