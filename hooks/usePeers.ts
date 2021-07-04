import { useEffect, useRef } from 'react'
import Peer from 'simple-peer'

export interface Peer {
    id: number
    peer: Peer.Instance
}

interface usePeersOutput {
    peers: readonly Peer[]
    addPeer: (peer: Peer) => void
    createSignal: (id: Peer['id'], signal: string | Peer.SignalData) => void
    removePeer: (id: Peer['id']) => void
    hasPeer: (id: Peer['id']) => boolean
}
export const usePeers = (): usePeersOutput => {
    const peersRef = useRef<Peer[]>([])

    const addPeer = (peer: Peer): void => {
        peersRef.current.push(peer)
    }

    const createSignal = (id: Peer['id'], signal: string | Peer.SignalData) => {
        const peerObj = peersRef.current.find((peer) => peer.id === id)
        if (peerObj) {
            peerObj.peer.signal(signal)
        }
    }

    const removePeer = (id: Peer['id']): void => {
        const newPeers = peersRef.current.filter(peerObj => {
            if (peerObj.id !== id) {
                peerObj.peer.destroy()
                return false
            }
            return true
        })
        peersRef.current = [...newPeers]
    }

    const hasPeer = (id: Peer['id']): boolean => {
        return !!peersRef.current.find(peers => peers.id === id)
    }

    useEffect(() => {
        return () => {
            peersRef.current.forEach(peerObj => {
                peerObj.peer.destroy()
            })
        }
    }, [])

    return {
        peers: peersRef.current,
        addPeer,
        createSignal,
        removePeer,
        hasPeer,
    }
}
