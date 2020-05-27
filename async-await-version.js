export async function getClue() {

    const response = await fetch("https://jservice.xyz/api/random-clue")
        .then((result) => {
            if (result.ok === false) {
                throw error(result.status)
            }
            else {
                return result.json()
            }
        })
    return response

}
