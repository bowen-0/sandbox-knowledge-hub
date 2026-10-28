# Retrospective: Building an LLM Wiki for the Innovation Sandbox for AI

Over the past 5 years, the Innovation Sandbox for AI of the Canton of Zurich has generated a growing body of knowledge through its pilot projects and published reports. While these reports work well as individual publications, much of their potential value lies across them: recurring challenges, transferable lessons, connections between legal, technical and organisational questions, and patterns that may only become visible when the projects are considered together.

We therefore explored whether this knowledge could be restructured in a way that makes it easier for AI systems to understand, retrieve and connect. The objective was not simply to make the reports searchable, but to test whether an LLM-readable knowledge layer could make the accumulated knowledge more accessible and potentially enable AI systems to identify relationships and patterns across projects.

We deliberately chose an LLM Wiki rather than relying only on more common approaches such as retrieval-augmented generation (RAG). In a typical RAG setup, reports are divided into chunks and the system retrieves the passages that appear most relevant to a user's question. This can work well for locating specific information, but it becomes more difficult when an answer requires connecting insights scattered across several reports. It can also create a form of contextual blindness: because only selected chunks are retrieved, relevant relationships elsewhere in the corpus may never enter the model's context. The wiki approach instead restructures the reports into explicit, interconnected pieces of knowledge. Our hypothesis was that this would make cross-report relationships easier for AI systems to navigate and, at the same time, make the reasoning behind an answer easier for humans to inspect and verify.

## 1. Approach

The project was deliberately designed as a feasibility study, not as a final product. The aim was to understand what can be done relatively easily with current LLMs, where difficulties emerge, and what would be required to develop such an approach further.

We began by identifying eleven representative questions that we wanted the knowledge layer to be able to answer. These questions formed an initial test set and helped guide the design of the wiki: they forced us to consider what information needed to be available, at what level of granularity, how different reports should be connected and which types of synthesis the structure should enable.

In parallel, we defined a set of principles for what a good answer should look like when an AI system uses the knowledge layer. Among other things, answers should make clear whether they are based on one or several reports, distinguish direct evidence from cross-report synthesis, remain transparent when the available evidence is incomplete, preserve uncertainty and make substantive claims traceable to their sources. These principles provided a reference point for assessing not only whether the system could retrieve information, but whether it could use that information responsibly and meaningfully.

The published reports were then restructured into a plain-Markdown wiki. Claude was used to generate the initial knowledge layer, extracting and reorganising information into interconnected projects, transferable lessons, cross-cutting syntheses, concepts, regulations, stakeholders and original sources. The original reports remained the ground truth, while substantive statements in the wiki were linked back to specific pages in those reports.

The generation process was followed by multiple layers of validation. Human review was used to check whether the generated content accurately reflected the reports, whether nuances had been preserved and whether the chosen structure made sense from a subject-matter perspective. In addition, LLM-driven verification was used to systematically check the generated knowledge against the source material, identify inconsistencies and test whether the wiki could answer the initial set of questions in line with the defined answer principles. The process was therefore not a one-off generation exercise, but an iterative cycle of generation, testing, verification and refinement.

The repository also includes a read-only Model Context Protocol (MCP) server, allowing compatible AI assistants and agents to navigate, search and retrieve information from the knowledge base directly. Processes and conventions for querying the wiki and incorporating additional reports are documented as part of the repository.

## 2. What we learned

### 1. Structure requires editorial decisions

Creating a structured knowledge base is not simply an extraction task. Decisions need to be made about what constitutes a project, concept or transferable lesson; how granular information should become; and which relationships between pieces of information are meaningful. These choices matter because the resulting structure influences what an AI system is subsequently able to find and connect. LLMs can support this work, but they cannot remove the need for editorial judgement.

### 2. Consider how the wiki will be updated from the beginning

Building an initial knowledge base is only one part of the challenge. If the underlying body of knowledge continues to grow, the system also needs a workable process for incorporating new reports, updating existing information, avoiding duplication and maintaining a consistent structure. In the feasibility study, this resulted in a defined AI-assisted ingestion process with human approval steps and automated structural checks. Designing for this from the beginning is significantly easier than trying to introduce maintainability afterwards.

### 3. Creating the first draft is easy; careful human review is crucial

Current LLMs can extract, restructure and summarise large amounts of information remarkably quickly. Producing a plausible first version of a wiki is therefore relatively straightforward. Ensuring that it accurately represents the source material is considerably harder.

Even slight ambiguity in a report can cause an LLM to interpret a statement differently from what the authors intended, combine related but distinct findings or make an implication appear more certain than the source supports. Human review is therefore not simply a final proofreading step: it is an important part of establishing whether the reconstructed knowledge still reflects the original meaning.

### 4. Traceability becomes essential

Once information is separated from its original report and recombined with findings from other projects, it becomes increasingly difficult for a user to know where a statement originated. Traceability therefore needs to be part of the architecture rather than an afterthought.

In the current wiki, substantive claims are linked back to the relevant page of the original report. This does not prevent errors, but it makes them checkable: users and reviewers can return to the source rather than having to trust the AI-generated representation.

### 5. How literal and comprehensive should restructuring be?

One of the more difficult questions is how far information should actually be condensed and restructured. A knowledge base becomes useful partly because it removes repetition and transforms long documents into smaller, interconnected pieces of knowledge. But abstraction also creates the risk of losing important context.

This is particularly relevant for legal information. A short statement of a legal finding may appear correct while omitting a qualification, exception or contextual condition that materially changes its meaning. There is therefore a tension between making information concise and AI-readable and preserving the precision and completeness of the original source. Different types of information may ultimately require different levels of abstraction, with particularly sensitive or consequential information remaining much closer to the original wording and source.

### 6. Help the AI distinguish which information is relevant for which user group

The same report can contain useful information for very different audiences. In our tests, LLMs were sometimes confused about whether a finding was relevant to someone deploying AI within their own organization, someone providing an AI solution as a product or to someone designing and operating a sandbox programme. These users may draw very different lessons from the same report, and advice that is appropriate for one can be subtly wrong for the other.

We therefore introduced this distinction explicitly into the knowledge structure. Pages containing guidance indicate which user group the advice is intended for, and the AI assistant is instructed to keep these perspectives separate. This proved to be an important reminder that making information accessible to AI systems is not only about structuring the content itself, but also about encoding who the information is for and in what context it should be applied.

## 3. Feasibility conclusion

The experiment shows that transforming a collection of reports into a structured, AI-queryable knowledge base is technically feasible. It also shows that the difficult part is not necessarily generating the wiki itself. The harder questions concern knowledge architecture, interpretation, quality assurance, traceability and long-term maintenance.

A technically functioning system is therefore not the same as an assured knowledge product. The current LLM Wiki has not been systematically evaluated or red-teamed, and its answers should not be treated as authoritative without checking the underlying sources. It should be understood as a feasibility study that demonstrates what is already possible while making visible the work that would still be required for an operational and trusted system.

## 4. Sharing the learning

An important objective of the project is to make the learning itself reusable. For this reason, both the current LLM Wiki and the approaches, conventions and processes developed while building it are publicly available on GitHub. This allows other public organisations, researchers and developers interested in making existing knowledge more accessible to AI systems to build on the experiment, test different approaches and hopefully avoid having to start from scratch.

- **Read the knowledge base:** <https://bowen-0.github.io/sandbox-knowledge-hub>. A searchable website with every page, and findings linked to the report page they come from. Nothing to install.
- **Connect it to your AI assistant:** <https://github.com/bowen-0/sandbox-knowledge-hub#use-it>. Step-by-step instructions for adding it to Claude or ChatGPT, so the assistant can answer questions across all the reports and cite the page each answer comes from. The page also documents the approach and processes described above.
