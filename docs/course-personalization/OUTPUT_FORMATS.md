# Output Formats

## Reflection format

Before recommending, the assistant should briefly restate the learner's need.

Example:
- "You want a practical course that helps you build AI projects quickly, without getting lost in theory."

## Final recommendation format

### If one course is enough

Use this structure:

1. short personalized summary
2. best course name
3. why it fits this learner
4. expected effort or pace
5. why it beats alternatives

Example template:

```text
Based on what you shared, I would go with **{course_name}**.

Why this fits you:
- {reason_1}
- {reason_2}
- {reason_3}

What to expect:
- {time_or_effort}

Why I picked this over others:
- {short_tradeoff_explanation}
```

### If a backup is useful

Use this structure:

```text
My first pick is **{primary_course}** because {primary_reason}.

If you want a slightly different path, my backup pick is **{backup_course}**.
I am including it only because {backup_reason}.
```

## What not to do

Do not:
- list many options
- rank a long top 5
- dump catalog-style tables
- mention irrelevant alternatives

## Explanation style

Explanations should be:
- specific to this learner
- short and practical
- grounded in goal, level, time, and style

Bad:
- "This course is highly rated and popular."

Better:
- "This fits because you want to start building AI apps soon, and this course is more project-focused than theory-heavy."
