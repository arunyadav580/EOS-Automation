const fs = require('fs');

function csvToJson(csvFilePath) {

    debugger;
    const data = fs.readFileSync(csvFilePath, 'utf8').split('\n');
    
    const result = {};
    const userIds = [];

    for (let i = 0; i < data.length; i++) {
        debugger;
        const row = data[i];
        const [userName, userId, sequence, questionId, score, answerId] = row.split(',');
        
        if (!result[userId]) {
            result[userId] = [];
        }

        if (userId !== '0' && !userIds.includes(userId)) {
            userIds.push(userId);
        }
        

        const question = {
            moneySign: userName.trim(),
            userCode: userId,
            sequence: parseInt(sequence),
            questionId: parseInt(questionId),
            score: parseFloat(score),
            answerId: parseInt(answerId)
        };

        result[userId].push(question);
    }

    const ansObj = [];
    for (const userId in result) {
        if (result.hasOwnProperty(userId)) {
            const userQuestions = result[userId];
            let previousQuestId = 0;
            let scoresList = [];
            let answerIdList = [];

            for (let j = 0; j < userQuestions.length; j++) {
                const { questionId, score, answerId } = userQuestions[j];

                if (questionId !== previousQuestId) {
                    if (previousQuestId !== 0) {
                        ansObj.push({
                            questionId: `${previousQuestId}`,
                            scores: scoresList.map(score => `${score}`),
                            answerids: answerIdList.map(answerId => `${answerId}`)
                        });
                    }
                    previousQuestId = questionId;
                    scoresList = [score];
                    answerIdList = [answerId];
                } else {
                    scoresList.push(score);
                    answerIdList.push(answerId);
                }
            }

            ansObj.push({
                questionId: `${previousQuestId}`,
                scores: scoresList.map(score => `${score}`),
                answerids: answerIdList.map(answerId => `${answerId}`)
            });
        }
    }

    return {ansObj,userIds};
}

module.exports = csvToJson;

