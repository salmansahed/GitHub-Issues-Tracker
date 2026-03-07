let allIssuesData = [];

const filterBtn = document.querySelectorAll('.filter-btn');

filterBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtn.forEach(button => {
            button.classList.remove('btn-primary');
        });
        btn.classList.add('btn-primary');

        if(btn.id === 'all-btn'){
            displayIssues(allIssuesData);
        }else if(btn.id === 'open-btn'){
            const openIssues = allIssuesData.filter(issue => issue.status === 'open');
            displayIssues(openIssues);
        }else if(btn.id === 'closed-btn'){
            const closedIssues = allIssuesData.filter(issue => issue.status === 'closed');
            displayIssues(closedIssues);
        }
    });
});


async function loadAllIssues() {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();
    allIssuesData = data.data;
    displayIssues(data.data);
}
loadAllIssues()


const labelConfigs = {
    "bug": {
        color: "bg-[#FEECEC] border-[#FECACA] text-[#EF4444]",
        icon: "fa-bug"
    },
    "help wanted": {
        color: "bg-[#FFF8DB] border-[#FDE68A] text-[#F59E0B]",
        icon: "fa-life-ring"
    },
    "enhancement": {
        color: "bg-[#E3F9E5] border-[#B1F0B7] text-[#1F8B24]",
        icon: "fa-wand-magic-sparkles"
    },
    "documentation": {
        color: "bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7]",
        icon: "fa-file-lines"
    },
    "good first issue": {
        color: "bg-[#F5F3FF] border-[#DDD6FE] text-[#7C3AED]",
        icon: "fa-star"
    }
};

async function issuesCardModal(id){
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    showModal(data.data)
}

function showModal(getData){
    const modalContainer = document.getElementById('modal-container');
    const dotColors = getData.status === 'open' ? 'bg-[#00A96E]' : 'bg-[#8b5cf6]';
    modalContainer.innerHTML = `
        <h2 class="text-xl md:text-2xl font-bold mb-2">${getData.title}</h2>
        <div class="flex items-center gap-2 mb-6">
            <p class="${dotColors} text-xs px-2 py-1 rounded-full text-white inline-block capitalize">${getData.status}</p>
            <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
            <p class="text-xs text-[#64748B]">${getData.author}</p>
            <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
            <p class="text-xs text-[#64748B]">${new Date(getData.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="flex items-center gap-2 mb-6 text-xs">
            ${getData.labels.map(labelName => {
                        const config = labelConfigs[labelName.toLowerCase()];
                        return `<p class="${config.color} border inline-block py-1 px-2 rounded-full uppercase font-medium"><i class="fa-solid ${config.icon}"></i> ${labelName}</p>`;
                    }).join('')}
        </div>
        <p class="text-[#64748B] mb-6">${getData.description}</p>
        <div class="bg-[#f8fafc] flex items-center justify-between p-4 rounded-md">
            <div class="w-full">
                <p class="text-[#64748B]">Assignee:</p>
                <p class="font-semibold">${getData.assignee}</p>
            </div>
            <div class="w-full">
                <p class="text-[#64748B]">Priority:</p>
                <p class="text-xs bg-[#EF4444] inline-block text-white px-3 py-1 rounded-full uppercase">${getData.priority}</p>
            </div>
        </div>
    `;
    document.getElementById('my_modal').showModal();
}


const issuesCardContainer = document.getElementById('issues-card-container');


function displayIssues(issues){
    if (!issues) return;
    issuesCardContainer.innerHTML = "";
    issues.forEach(issue => {
        const div = document.createElement('div');
        const dotColor = issue.status === 'open' ? 'bg-[#00A96E]' : 'bg-[#8b5cf6]';
        const priorityColor = issue.priority === 'high'? `bg-[#FEECEC] text-[#EF4444]` : (issue.priority === 'low')? `bg-[#EEEFF2] text-[#9CA3AF]`: (issue.priority === 'medium')? `bg-[#FFF6D1] text-[#F59E0B]` : 'bg-gray-100';

        const isOpen = issue.status === 'open';
        const topBorder = isOpen ? 'border-t-[#00A96E]' : 'border-t-[#8b5cf6]';
        div.innerHTML = `
            <div onclick="issuesCardModal(${issue.id})" class="bg-white shadow p-4 rounded-md h-full border-t-4 ${topBorder}">
                <div class="flex justify-between items-center">
                    <p class="flex items-center gap-2 capitalize"><span class="w-3.5 h-3.5 rounded-full ${dotColor} inline-block"></span><span>${issue.status}</span></p>
                    <p class="${priorityColor} inline-block py-1 px-5 rounded-full font-medium text-sm uppercase">${issue.priority}</p>
                </div>
                <h2 class="text-sm font-semibold mt-3 leading-6 mb-2">${issue.title}</h2>
                <p class="text-[#64748B] text-xs line-clamp-2">${issue.description}</p>
                <div class="mt-3 text-xs flex flex-wrap gap-2">
                    ${issue.labels.map(labelName => {
                        const config = labelConfigs[labelName.toLowerCase()];
                        return `<p class="${config.color} border inline-block py-1 px-2 rounded-full uppercase font-medium"><i class="fa-solid ${config.icon}"></i> ${labelName}</p>`;
                    }).join('')}
                </div>
                <hr class="text-[#e4e4e7] border -mx-4 my-4">
                <div class="space-y-2 text-[#64748B] text-xs">
                    <p>${issue.author}</p>
                    <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        issuesCardContainer.appendChild(div);
    })
    document.getElementById('total-issues').innerText = issuesCardContainer.children.length;
}