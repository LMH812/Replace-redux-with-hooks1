import { useEffect, useState } from 'react'

let globalState = {}
let listeners = []
let actions = {}

export const useStore = (sholdListener = true) => {
    const setState = useState(globalState)[1]
    const dispatch = (actionIdentifier, payload) => {
        // console.log(actionIdentifier)
        const newState = actions[actionIdentifier](globalState, payload)
        globalState = { ...globalState, ...newState }
        for (const listener of listeners) {
            listener(globalState)
        }
    }

    useEffect(() => {
        if (sholdListener) {
            listeners.push(setState)
        }

        return () => {
            listeners = listeners.filter((li) => li !== setState)
        }
    }, [setState, sholdListener])
    return [globalState, dispatch]
}

export const initStore = (userActions, intialState) => {
    if (intialState) {
        globalState = { ...globalState, ...intialState }
    }
    console.log(actions)
    actions = { ...actions, ...userActions }
    console.log(actions)
}
