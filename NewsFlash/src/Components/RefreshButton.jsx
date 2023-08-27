

export default function RefreshButton({...props}) {
    function refresh() {
        window.location.reload()
    }

    return (
        <button className="refresh-button" onClick={() => refresh()} {...props}>
            Refresh
        </button>
    )
}