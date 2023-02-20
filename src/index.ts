import {promises as fs} from 'fs'
import readline from 'readline-sync'

const stringify = (unicode: number) =>  {
    return String.fromCharCode(unicode)
}

const run = async (code: string) => {
    // console.log('run start');
    const variables: number[] = []
    let pointer = 0

    const statements = code.trim().split(code.includes('UuU') ? 'UuU' : '\n').map(line => line.trim());
    // console.log(statements);

    if(statements[0] !== '비혼주의는' || !statements.slice(-1)[0].startsWith('로 완성이 돼요')) {
        throw new Error('Error: 이건 재즈가 아니야.')
    }

    const evaluate = async (x: string): Promise<number> => {
        let n = 0

        // 콘솔에서 정수 입력 받기.
        if(x.includes('샤빱뚜비두밥?')) {
            const answer= readline.question();
            x = x.replace('샤빱뚜비두밥?', 'O'.repeat(Number(answer)))
        }

        // 변수 사용
        if(x.includes('.')) n += variables[x.split('.').length - 1]

        // 연산자
        if(x.includes('O')) n += x.split('O').length - 1
        if(x.includes('o')) n -= x.split('o').length - 1
        if(x.includes('8')) return (await Promise.all(x.split('8').map(evaluate))).reduce((a, b) => a * b)
        return n
    }

    const execute = async (statement: string): Promise<number | undefined> => {
        // 대머리 [0]일때 ? 뒤의 state 실행
        if (statement.includes('대머리') && statement.includes('?')) {
            const condition = await evaluate(statement.substring(2, statement.lastIndexOf('?') + 1))
            if (condition === 0) {
                return execute(statement.substring(statement.lastIndexOf('?') + 1));
            }
            return
        }

        if(statement.includes('ㅇ')) {
            // 변수 위치 반환
            const variablePointer = statement.split('ㅇ')[0].split('.').length;
            variables[variablePointer] = await evaluate(statement.split('ㅇ')[1]);
        }

        if (statement.includes('샤빱뚜비두밥') && statement[statement.length - 1] === '!') {
            process.stdout.write(String(await evaluate(statement.slice(6, -1))));
        }

        if (statement.includes('샤빱뚜비두밥') && statement[statement.length - 1] === 'ㅋ') {
            if (statement === '샤빱뚜비두밥ㅋ') process.stdout.write('\n');
            process.stdout.write(stringify(await evaluate(statement.slice(1, -1))))
        }

        if(statement.includes('주')) {
            pointer = await evaluate(statement.split('주')[1]) - 1
        }

        if (statement.indexOf('하남자=') === 0) {
            return evaluate(statement.split('하남자=')[1])
        }
    }
    // console.log('type = ' + typeof statements[pointer]);
    while(!statements[pointer].startsWith('로 완성이 돼요')) {
        // console.log('statement = '+ typeof statements[pointer+1]);
        // console.log('pointer = ' + pointer);
        pointer+=1;
        const statement = statements[pointer]
        const evaluated = await execute(statement)
        if(evaluated) return evaluated
    }
}

const bootstrap = async (path: string) => {
    try {
        try {
            await fs.access(path)
        } catch(e) {
            throw new Error(`Error: ${path}는 읽혀지지 않아.`)
        }

        await run((await fs.readFile(path, 'utf-8')))
    } catch(e) {
        process.stderr.write(`${e.message}\n`)
    }
}

if(process.argv[2]) bootstrap(process.argv[2])