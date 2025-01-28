const url = "https://www.duolingo.com/2017-06-30/users/1647733222/rewards/CAPSTONE_COMPLETION-6a459295_f41c_38d9_91ba_ddd5f57d014d-1-GEMS";

const payload = {
    amount: 0,
    consumed: true,
    skillId: "5f08f69597ce7cd1663401c41a5223ac",
    type: "mission"
};
    var token = process.env.token;
    const token = removeQuotes(process.env.token);

const headers = {
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.7",
    "authorization": `Bearer ${token}`,
    "content-type": "application/json",
    "Referer": "https://www.duolingo.com/practice",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
};

async function sendRequest() {
    while (true) {
        try {
            const response = await axios.patch(url, payload, { headers });
            console.log(`Status Code: ${response.status}`);
            console.log(`Response Body: ${JSON.stringify(response.data)}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Lỗi xảy ra: ${error}`);
        }
    }
}

sendRequest();
