import React from 'react'
import { MarkdownEditor } from 'react-markdown-editor'
import { HorizontalLine } from '../../../components'

const WidgetSettingsText = ((props) => {
    return (
        <div>
            <HorizontalLine />
            <label htmlFor="">Text content</label>
            <MarkdownEditor initialContent={props.widget.configs.text}
                iconsSet="font-awesome"
                onContentChange={props.onContentChange} />
            <HorizontalLine />
        </div>
    )
})

export default WidgetSettingsText