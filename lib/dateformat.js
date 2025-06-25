export const formatDateTime = (dateString) => {
    const dateTimeOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }

    return new Date(dateString).toLocaleString('en-US', dateTimeOptions)
}
