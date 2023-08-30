import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as RadixAccordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import React from 'react';
import icons from '../constants/icons';

export interface IAccordionProps {
    children?:
        | React.ReactElement<typeof AccordionItem>
        | React.ReactElement<typeof AccordionItem>[];
    className?: string;
}

const Accordion = ({ children, className }: IAccordionProps) => (
    <RadixAccordion.Root
        className={clsx(
            'rounded-md shadow-[0_2px_10px] shadow-black/5',
            className,
        )}
        type="multiple"
    >
        {children}
    </RadixAccordion.Root>
);

export const AccordionItem = React.forwardRef<
    HTMLDivElement,
    RadixAccordion.AccordionItemProps
>(({ children, className, ...props }, forwardedRef) => (
    <RadixAccordion.Item
        className={clsx(
            'focus-within:shadow mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 ',
            className,
        )}
        {...props}
        ref={forwardedRef}
    >
        {children}
    </RadixAccordion.Item>
));

export const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    RadixAccordion.AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
    <RadixAccordion.Header className="flex">
        <RadixAccordion.Trigger
            className={clsx(
                'text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none',
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <FontAwesomeIcon
                className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                icon={icons.s_chevron_down}
                aria-hidden
            />
        </RadixAccordion.Trigger>
    </RadixAccordion.Header>
));

export const AccordionContent = React.forwardRef<
    HTMLDivElement,
    RadixAccordion.AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
    <RadixAccordion.Content
        className={clsx(
            'text-mauve11 bg-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
            className,
        )}
        {...props}
        ref={forwardedRef}
    >
        <div className="px-5 py-[15px]">{children}</div>
    </RadixAccordion.Content>
));

export default Accordion;
