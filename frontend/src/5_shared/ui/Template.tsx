interface TemplateProps extends React.PropsWithChildren {

}

export const Template: React.FC<TemplateProps> = ({ children, ...props }) => {

    const classList = ['layout']

    return (
        <div className={classList.join(' ')} {...props} >
            {children}
        </div>
    )
}