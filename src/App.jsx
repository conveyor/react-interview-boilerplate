import {useEffect, useMemo, useState} from 'react'
import {useFetch} from 'use-http'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [draftMessage, setDraftMessage] = useState('')
    const [editId, setEditId] = useState(null);
    const [messages, setMessages] = useState([])
    // 'create' or 'edit'
    const [mode, setMode] = useState('create')
    const [branch, setBranch] = useState(0)

    const {get, post, put, del, response} = useFetch('http://localhost:3000')


    // The last argument [] means it will run onMount. If you pass it a variable like [someVariable], it will run onMount and again whenever someVariable changes values
    // const { loading, error, data = '' } = useFetch("https://glowing-space-orbit-77x77x7q4rcwx64-3000.app.github.dev/", {}, []);

    async function loadInitialTodos() {
        const initialTodos = await get('/messages')
        if (response.ok) setMessages(initialTodos)
    }

    async function addMessage() {
        const priorMessage = messages[messages.length - 1];
        const newMessages = [...messages, {text: draftMessage}]
        setMessages(newMessages)
        const newMessage = await post('/messages', {text: draftMessage, prior_message_id: priorMessage.id || 0, branch_id: priorMessage.branch_id || 0})
        if (response.ok) setMessages([...newMessages, newMessage])
    }

    async function startEdit(id) {
        const targetMessage = messages.find((message) => message.id === id);
        setDraftMessage(targetMessage.text);
        setMode('edit');
        setEditId(id);
    }

    async function saveEdit() {
        const targetMessageIndex = messages.findIndex((message) => message.id === editId);
        const priorMessage = messages[targetMessageIndex - 1];

        const newMessage = await post(`/messages`, {text: draftMessage, prior_message_id: priorMessage.id || 0, branch_id: priorMessage.branch_id + 1|| 1})
        if (response.ok) setMessages([...messages, newMessage])
        setMode('create');
        setEditId(null);
    }

    useEffect(() => {
        loadInitialTodos();
    }, [])

    // const getBranchMessages = (branchId) => {
    //
    // };
    //
    // const inScopeMessages = useMemo(() => {
    //     // The first message in the branch is the trunk. It's always in scope
    //     const [firstMessage, ...rest] = messages;
    //     const priorMessage = firstMessage;
    //     //
    //     const trunkBranch = priorMessage.branch_id;
    //     return rest.filter((message) => {
    //
    //     })
    // }, [branch, messages])


    return (
        <>
            {(inScopeMessages || []).map((message) => (
                <div key={message.text}>
                    <hr/>
                    <span>{message.text}</span>
                    { (message.message_type === 'user' && (
                        <button onClick={() => startEdit(message.id)}>Edit</button>
                    ))}
                </div>
            ))}
            {mode == 'edit' ? (
                <>
                    <input type="text" value={draftMessage} onChange={(e) => setDraftMessage(e.target.value)}/>
                    <button onClick={saveEdit}>Edit Message</button>
                </>
            ) : (

                <>
                    <input type="text" value={draftMessage} onChange={(e) => setDraftMessage(e.target.value)}/>
                    <button onClick={addMessage}>Add Message</button>
                </>
            )}
            <button onClick={() => setBranch(branch - 1)}>Previous Branch</button>
            <button onClick={() => setBranch(branch + 1)}>Next Branch</button>
        </>
    )
}

export default App
